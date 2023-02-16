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

router.post("/potholes/report", userMiddleware, async (req, res) => {
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
    res.send("Pothole submitted!");
});

router.post("/potholes/repair", async (req, res) => {
    let userPotholeId = req.body.potholeId;
    console.log(req.body);
    await subtractReportCount(userPotholeId);
    res.send("Pothole repair reported!");
});


router.get("/potholes", async (req, res) => {
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

const routingApi = require("./routing");
router.use("/routing", routingApi);

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

//Locates pothole in Database, lowers report count by 1
async function subtractReportCount (potholeID) {
    sql = "SELECT * FROM `Potholes` WHERE `ID` = ?";
    const [results] = await db.query(sql, potholeID);
    for(var i = 0; i < results.length; i++){
        currentReportCount = parseInt(results[i].report_count);
    }
    let newReportCount = currentReportCount - 1;
    //Delete pothole from databse if the number if the number of times the pothole has been reported fix equals
    //the number of times the pothole has been reported. Otherwise, just update the report count. 
    if (newReportCount <= 0) {
        deletePothole (potholeID);
    } else {
        let updateSql = "UPDATE `Potholes` SET `report_count` = ? WHERE `ID` = ?";
        await db.query(updateSql, [newReportCount, potholeID]);
    }
}

//Function to delete pothole from database
async function deletePothole(potholeId)
 {
    var sql = "DELETE FROM `Potholes` WHERE `ID` = ?";
    let potholeQuery =  await db.query(sql, potholeId, (err, result) => {
        if (err) throw err;
            console.log(result);
        });
    console.log("Pothole Deleted");
 }

