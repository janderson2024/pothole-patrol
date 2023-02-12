const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const db = require("../database/connection");

const COOKIE_NAME = process.env.COOKIE_NAME;
//milli in sec * sec in min * min in hr * hr in day * day in month
const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

function makeCookie(res, uid){
    console.log("Signed in user: " + uid);
    return res.cookie(COOKIE_NAME, uid, {signed : true, maxAge: ONE_MONTH}).json({"uID" : uid});
}

async function checkLastSignin(res, sqlResult){
    //check if the match is spamming this endpoint
    const lastSignin = new Date(sqlResult.last_signin);
    const now = new Date();
    const diffBetweenNowAndReport = now.getTime() - lastSignin.getTime();

    //checks if the difference is greater than 1 minute
    if(diffBetweenNowAndReport >= (1000 * 60 * 1)){
        const updateSQL = "UPDATE `Users` SET `last_signin` = now() WHERE `ID` = ?";
        await db.query(updateSQL, [result.ID]);
        return makeCookie(res, result.ID);
    } else {
        console.log("caught a spam login attempt!");
        return res.status(401).json({"error": "slow down"});
    }
}


//register endpoint to get a userID 
//requires a latitude and longitude in the body
//returns a uid

router.post("/register", async (req, res) => {
    if(!(req.body.latitude && req.body.longitude)){
        //lat and lon aren't being sent by client. Reject and move on.
        return res.status(401).json({"error": "need latitude and longitude"});
    }

    const userLat = req.body.latitude;
    const userLon = req.body.longitude;

    //checks if there is a cookie AND it is signed. 
    //If the cookie isn't properly signed, we cant trust it
    if(req.signedCookies[COOKIE_NAME]){
        const uid = req.signedCookies[COOKIE_NAME]
        //cookie is already set and signed, so it's not tampered

        //check if the user is actually in the DB
        const getUserSql = "SELECT * FROM `Users` WHERE `ID` = ?";
        const [result] = await db.query(getUserSql, [uid]);
        const user = result[0];
        if(user){
            return makeCookie(res, uid); 
        }
        res.clearCookie(COOKIE_NAME);
        
    }

    //pull the ip and user-agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    ua = req.header("user-agent");
    const userAgent = ua.substring(0, Math.min(200, ua.length));

    //make a db request to see if there is any current user with that IP
    const checkForUsedIPSQL = "SELECT * from `Users` WHERE `ip` = ?";
    const [results] = await db.query(checkForUsedIPSQL, [ip]);

    //check results to check for current user with IP
    if(results.length >= 1){
        //there is at least one user with the same ip
        for(result of results){
            //returns the first one that matches ip and user agent
            if(result.user_agent == userAgent){
                //check if the match is spamming this endpoint
                return await checkLastSignin(res, result);
            }
        }
        //if it makes it here: check the time and return the first one
        return await checkLastSignin(res, results[0]);
    }

    //user ip is not in the system, so now its time to create a new user

    //get the country from the IP address
    const apiUrl = "http://ip-api.com/json/"+ ip;
    const ipApiResp = await fetch(apiUrl);
    const ipapiData = await ipApiResp.json();

    //now we make the call to the geoapify service
    const geoUrl = "https://api.geoapify.com/v1/geocode/reverse?lat="+ userLat +"&lon=" + userLon + "&type=street&format=json&apiKey=" + process.env.GEOAPIFY_KEY;
    const geoResp = await fetch(geoUrl);
    const geoData = await geoResp.json();

    if(geoData.error){
        return res.status(401).json({"geoData error": geoData.message});
    }
    if(geoData.results.length < 1 || (!geoData.results[0].county) || (!geoData.results[0].country)){
        return res.status(401).json({"geoData error": "Lat Lon could not result in data"});
    }
    
    const userCounty = geoData.results[0].county;
    

    //if the ipApi fails, just move on...
    //if success, but countries aren't equal: fail and call it spam 
    if(ipapiData.status == "success"){
        const ipCountry = ipapiData.country;
        const userCountry = geoData.results[0].country;
        if(ipCountry != userCountry){
            return res.status(401).json({"error": "Ip address in different country than report"});
        }
    }

    //At this point: it is time to insert the new user
    //new user with a reliability score of 1, a last report time set to 5 min ago (to help dodge the spam detection), and a last signin time of now
    const insertSql = 'INSERT INTO `Users` (`user_agent`, `county`, `ip`, `reliability`, `last_report`, `last_signin`) VALUES (?, ?, ?, 1, now()-300, now());'
    const [insertResult] = await db.query(insertSql, [userAgent, userCounty, ip]);
    console.log("Created new user: " + insertResult.insertId);

    return makeCookie(res, insertResult.insertId);
});

module.exports = router;

