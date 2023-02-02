const fetch = require("node-fetch");

const db = require("../database/connection");

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

    //limits this to 1 report to 1 minute (only on production)
    if(process.env.MODE == "production" && (diffBetweenNowAndReport <= (1000 * 60 * 1))){
        return res.status(401).json({"error":"last report was too soon"});
    }

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    if(!latitude || !longitude){
        return res.status(401).json({"error":"No included lat/lon"});
    }

    const geoUrl = "https://api.geoapify.com/v1/geocode/reverse?lat="+ latitude +"&lon=" + longitude + "&type=street&format=json&apiKey=" + process.env.GEOAPIFY_KEY;
    const fetchResp = await fetch(geoUrl);
    const geoData = await fetchResp.json();
    if(geoData.error){
        return res.status(401).json({"geoData error": geoData.message});
    }
    if(geoData.results.length < 1 || (!geoData.results[0].city)){
        return res.status(401).json({"geoData error": "Lat Lon could not result in a city"});
    }
    geoCity = geoData.results[0].city;

    if(process.env.MODE == "production" && user.city != geoCity){
        return res.status(401).json({"error":"different city than recorded user city... fail quietly"});
    }

    //at this point a report is going to be created.
    //Update last_report and send data to api
    
    const updateReportSql = "UPDATE `Users` SET `last_report` = now() WHERE `ID` = ?";
    await db.query(updateReportSql, [user.ID]);

    req.user = user;
    req.geoData = geoData.results[0];
    req.latitude = latitude;
    req.longitude = longitude;
    next();
}

module.exports = userMiddleware;