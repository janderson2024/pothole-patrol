const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const db = require("../database/connection");
const latlonDistance = require("../helpers/latlonDistance");

//temporary testing user_register_test
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../test_html/user_register_test.html"));
});


const COOKIE_NAME = "uID";
//milli in sec * sec in min * min in hr * hr in day * day in month
const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

function makeCookie(res, uid){
    console.log("Signed in user: " + uid);
    return res.cookie(COOKIE_NAME, uid, {signed : true, maxAge: ONE_MONTH}).json({"uID" : uid});
}

async function checkLastSignin(res, sqlResult){
    //check if the match is spamming this endpoint
    const last_signin = new Date(sqlResult.last_signin);
    const now = new Date();
    const diffBetweenNowAndReport = now.getTime() - last_signin.getTime();

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
        uid = req.signedCookies[COOKIE_NAME]
        //cookie is already set and signed, so it's not tampered
        return makeCookie(res, uid);
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

    //first we want to get the city from the ip
    //we try the ip-api first. It's free, so I don't feel bad if the results don't line up
    //fetch the ip geolocation data from the ip-api API
    const apiUrl = "http://ip-api.com/json/"+ ip + "?fields=126975";
    fetchResp = await fetch(apiUrl);
    ipapiData = await fetchResp.json();

    var city = "";
    //get the city from the api returned data
    if(ipapiData.status == "success"){
        const distance = latlonDistance(ipapiData.lat, ipapiData.lon, userLat, userLon);
        
        //if the distance is less than 15 km, then we use this city as the response
        if(distance <= 15){
            city = ipapiData.city;
        }
    }

    if(!city){
        //only run if city hasn't been set yet
        //now we make the call to the geoapify service
        const geoUrl = "https://api.geoapify.com/v1/geocode/reverse?lat="+ userLat +"&lon=" + userLon + "&format=json&apiKey=" + process.env.GEOAPIFY_KEY;
        const fetchResp = await fetch(geoUrl);
        const geoData = await fetchResp.json();

        city = geoData.results[0].city;
    }

    //At this point: it is time to insert the new user
    //new user with a reliability score of 1, a last report time set to 5 min ago (to help dodge the spam detection), and a last signin time of now
    const insertSql = 'INSERT INTO `Users` (`user_agent`, `city`, `ip`, `reliability`, `last_report`, `last_signin`) VALUES (?, ?, ?, 1, now()-300, now());'
    const [insertResult] = await db.query(insertSql, [userAgent, city, ip]);
    console.log("Created new user: " + insertResult.insertId);

    return makeCookie(res, insertResult.insertId);
});

module.exports = router;

