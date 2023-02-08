const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const router = express.Router();

const userMiddleware = require("./userMiddleware");
//const apiHelper = require("../helpers/apiHelper");
const db = require("../database/connection");

router.get("/", (req, res) => {
    res.send("API page");
    console.log("API route successful");
});

/* User Input Latitudes / Longitudes for DB Testing:
Latitude: 40.748817 | Longitude: -73.985428 | City: New York | Zip: 10001
Latitude: 41.8789 | Longitude: -87.6369 | City: Chicago | Zip: 60606
Latitude: 47.6123 | Longitude: -122.3363 | City: Seattle | Zip: 98191
Latitude: 42.0267 | Longitude: -93.6465 | City: Ames | Zip: 00000
*/

router.post("/submitpothole", userMiddleware, async (req, res) => {
    let userLat = req.body.latitude;
    let userLong = req.body.longitude;
    let userCity = req.geoData.city;
    let userZip = req.geoData.postcode;
    let userID = req.user.ID
    let sqlTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let completionStatus = "Not completed";
    let reportCount = 1;
    let thisPotholeID = 0;

    let dbLats = await getPotholeLatitudes();
    let dbLongs = await getPotholeLongitudes();

    if (userZip == null) {
        userZip = "00000";
    }
    
    let latitudeMatch = await duplicateLatitude(dbLats, userLat);
    let longitudeMatch = await duplicateLongitude(dbLongs, userLong);

    if (latitudeMatch === 0 || longitudeMatch === 0) {
        //If no duplicates, insert new pothole into database
        let pothole = {
            city : userCity, 
            zipcode: userZip,
            report_count: reportCount,
            status: completionStatus,
            approx_latitude: userLat,
            approx_longitude: userLong
        };
        let potholeSql = "INSERT INTO Potholes SET ?";
        let potholeQuery =  await db.query(potholeSql, pothole, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        thisPotholeID = await findPothlholeIDLatitude(userLat);
    } else  {
        //Find matching pothole and update the report count
        thisPotholeID = await findPothlholeIDLatitude(latitudeMatch);
        await updateReportCount(thisPotholeID);
    }
    
    //Add to Report Database
    let report = {
        potholeID: thisPotholeID,
        userID: userID,
        timestamp: sqlTimestamp,
        latitude: userLat,
        longitude: userLong
    };
    
    let reportSql = "INSERT INTO Reports SET ?";
    let reportQuery =  await db.query(reportSql, report, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    //console.log("Pothole and/or Report succesfully added to DB");
});

router.post("/reportrepair", userMiddleware, async (req, res) => {
    let potholeLat = req.body.latitude;
    let potholeLong = req.body.longitude;

    console.log(potholeLat);
    console.log(potholeLong);

    //Add code to find pothole ID and udate completion status of pothole
});


router.get("/potholes", async (req, res) => {
    /*const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const filter = req.query.filter;

    if(!(latitude && longitude && filter && (filter == "city" || filter == "zip"))){
        const url = "/api/potholes?latitude={latitude}&longitude={longitude}&filter={city or zip}";
        const error = "missing queries. Url should look like " + url;
        return res.status(401).json({"error":error});
    }/*

    /*const geoUrl = "https://api.geoapify.com/v1/geocode/reverse?lat="+ latitude +"&lon=" + longitude + "&type=street&format=json&apiKey=" + process.env.GEOAPIFY_KEY;
    const fetchResp = await fetch(geoUrl);
    const geoData = await fetchResp.json();

    if(geoData.error){
        return res.status(401).json({"geoData error": geoData.message});
    }
    if(geoData.results.length < 1){
        return res.status(401).json({"geoData error": "Lat Lon could not result in city or zip"});
    }
    const geoResult = geoData.results[0];

    var searchFilter;
    var getPotholeSql;
    if(filter == "city"){
        searchFilter = geoResult.city;
        getPotholeSql = "SELECT * FROM `Potholes` WHERE `city` = ?";
    } else {
        searchFilter = geoResult.postcode;
        getPotholeSql = "SELECT * FROM `Potholes` WHERE `zipcode` = ?";
    }
    
    const [results] = await db.query(getPotholeSql, [searchFilter]);*/
    const getPotholeSQL = "SELECT * FROM `Potholes`";

    const [results] = await db.query(getPotholeSQL);

    var returnObj = {potholes:[]};
    for(result of results){
        pothole = {
            "potholeID" : result.ID,
            "city" : result.city,
            "zip" : result.zipcode,
            "reportCount" : result.report_count,
            "status" : result.status,
            "latitude" : parseFloat(result.approx_latitude),
            "longitude" : parseFloat(result.approx_longitude)
        };
        returnObj.potholes.push(pothole);
    }

    res.json(returnObj);

});

router.post("/mid_test", userMiddleware, (req, res) => {
    console.log("On the api side...");
    console.log(req.user);
    console.log(req.geoData);
    console.log(req.latitude);
    console.log(req.longitude);
    res.json({"nerd": "true"});
});

router.post("/frontend_test", userMiddleware, (req, res) => {
    console.log("The frontend made a request to this api!");

    res.json({"success": "Data was recieved and will be saved", "lat" : req.body.latitude, "long" : req.body.longitude});
});

router.get("/show_console", (req, res) => {
    if(process.env.MODE != "production"){
        return res.send("You are not on the server. You dont need to access this!");
    }
    if(req.cookies["test_html_key"] != process.env.TEST_HTML_KEY){
        return res.send("Imagine trying to bypass my checks lmaoooooooo");
    }
    res.sendFile(path.join(__dirname, "../output.txt"));
});



module.exports = router;

/*app.get("/potholes_in_city/:city", async (req, res) => {
    sql = 'SELECT ID, approx_latitude, approx_longitude FROM `Potholes` WHERE `city` = ?';
    const [results] = await db.query(sql, [req.params.city]);
    console.log(results);
    //format and res.json()
});*/

async function getPotholeLatitudes(){
    let allLatitudes = [];
    sql = 'SELECT  * FROM `Potholes`';
    const [results] = await db.query(sql);
    for(var i = 0; i < results.length; i++){
        currentLat = parseFloat(results[i].approx_latitude);
        allLatitudes.push(currentLat);
    }
    return allLatitudes;
}

async function getPotholeLongitudes(){
    let allLongitudes = [];
    sql = 'SELECT  * FROM `Potholes`';
    const [results] = await db.query(sql);
    for(var i = 0; i < results.length; i++){
        currentLong = parseFloat(results[i].approx_longitude);
        allLongitudes.push(currentLong);
    }
    return allLongitudes;
}

async function duplicateLatitude(lats, newLat) {
    for (var i = 0; i < lats.length; i++) {
        var absLat = Math.abs(lats[i]);
        var absNewLat = Math.abs(newLat);
        var difference = absLat - absNewLat;
        if (difference > -0.001 && difference < 0.001) {
            return lats[i];
        }
    }
    return 0;
}

//Function to determine if longitude is a duplicate
async function duplicateLongitude(longs, newLong) {
    for (var i = 0; i < longs.length; i++) {
        var absLong = Math.abs(longs[i]);
        var absNewLong = Math.abs(newLong);
        var difference = absLong - absNewLong;
        if (difference > -0.001 && difference < 0.001) {
            return longs[i];
        }
    }
    return 0;
}

async function findPothlholeIDLatitude (coordinate) {
    sql = "SELECT * FROM `Potholes` WHERE `approx_latitude` = ?";
    const [results] = await db.query(sql, coordinate);
    for(var i = 0; i < results.length; i++){
        currentID = parseInt(results[i].ID);
    }
    return currentID;
}

//At this time, this function is not being used. I am keeping it for now in case of errors during debugging. 
async function findPothlholeIDLongitude (coordinate) {
    sql = "SELECT * FROM `Potholes` WHERE `approx_longitude` = ?";
    const [results] = await db.query(sql, coordinate);
    for(var i = 0; i < results.length; i++){
        currentID = parseInt(results[i].ID);
    }
    return currentID;
}

async function updateReportCount (potholeID) {
    sql = "SELECT * FROM `Potholes` WHERE `ID` = ?";
    const [results] = await db.query(sql, potholeID);
    for(var i = 0; i < results.length; i++){
        currentReportCount = parseInt(results[i].report_count);
    }
    let newReportCount = currentReportCount + 1;
    let updateSql = "UPDATE `Potholes` SET `report_count` = ? WHERE `ID` = ?";
    await db.query(updateSql, [newReportCount, potholeID]);
}