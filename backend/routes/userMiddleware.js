const fetch = require("node-fetch");

const db = require("../database/connection");
const latlonDistance = require("../helpers/latlonDistance");

const COOKIE_NAME = process.env.COOKIE_NAME;

async function userMiddleware(req, res, next){
    if(!req.signedCookies[COOKIE_NAME]){
        return res.status(401).json({"error":"no uid provided"});
    }
    const UID = req.signedCookies[COOKIE_NAME];

    const getUserSql = "SELECT * FROM `Users` WHERE `ID` = ?";
    const [result] = await db.query(getUserSql, [UID]);
    const user = result[0];
    if(!user){
        return res.status(501).json({"error":"uid provided, but not in db"});
    }

    const lastReport = new Date(user.last_report);
    const now = new Date();
    const diffBetweenNowAndReport = now.getTime() - lastReport.getTime();

    //limits this to 1 report to 1 minute
    if(diffBetweenNowAndReport <= (1000 * 60 * 1)){
        return res.status(401).json({"error":"last report was too soon"});
    }

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    if(!latitude || !longitude){
        return res.status(401).json({"error":"No included lat/lon"});
    }

    const geoUrl = "https://api.geoapify.com/v1/geocode/reverse?lat="+ latitude +"&lon=" + longitude + "&format=json&apiKey=" + process.env.GEOAPIFY_KEY;
    const fetchResp = await fetch(geoUrl);
    const geoData = await fetchResp.json();

    geoCity = geoData.results[0].city;

    /*console.log("-----------");
    console.log(user);
    console.log(latitude);
    console.log(longitude);
    console.log(geoData);
    console.log("Geoapify city: " + geoCity);*/

    if(user.city != geoCity){
        return res.status(401).json({"error":"different city than recorded user city... fail quietly"});
    }

    req.user = user;
    req.geoData = geoData;
    req.latitude = latitude;
    req.longitude = longitude;
    next();
    //authenticate user and request

    //if all good: pass on to next()

    //else return error 401
    next();
}

module.exports = userMiddleware;