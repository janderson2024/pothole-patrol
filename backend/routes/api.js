const express = require("express");
const path = require("path");
const router = express.Router();

const userMiddleware = require("./userMiddleware");
const apiHelper = require("../helpers/apiHelper");
const db = require("../database/connection");

router.get("/", (req, res) => {
    res.send("API page");
    console.log("API route successful");
});

//Add hard-coded sample pothole
router.post("/submitpothole", userMiddleware, async (req, res) => {
    let userLat = req.body.latitude;
    let userLong = req.body.longitude;
    console.log(userLat);
    console.log(userLong);
    const dbLats = await getDBLatitudes();
    console.log(dbLats);
    const isDuplicateLatitude = await duplicateLatitude(dbLats, userLat);
    console.log(isDuplicateLatitude);
    console.log("Adding pothole to database");
    let pothole = {
        city : "Des Moines", 
        zipcode: "50311",
        report_count: 1,
        status: "Not completed",
        approx_latitude: userLat,
        approx_longitude: userLong
    };
    /*let sql = "INSERT INTO potholes SET ?";
    let query =  await db.query(sql, pothole, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Pothole added");
    });
    console.log("Pothole added correctly");*/
});

router.post("/mid_test", userMiddleware, (req, res) => {
    console.log("On the api side...");
    console.log(req.user);
    console.log(req.geoData);
    console.log(req.latitude);
    console.log(req.longitude);
    res.send({"nerd": "true"});
});

router.post("/frontend_test", userMiddleware, (req, res) => {
    console.log("The frontend made a request to this api!");

    res.send({"success": "Data was recieved and will be saved", "lat" : req.body.latitude, "long" : req.body.longitude});
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

async function getDBLatitudes(){
    let allLatitudes = [];
    sql = 'SELECT  * FROM `Potholes`';
    const [results] = await db.query(sql);
    //console.log(results);
    for(var i = 0; i < results.length; i++){
        currentLat = parseFloat(results[i].approx_latitude);
        allLatitudes.push(currentLat);
    }
    return allLatitudes;
}

async function duplicateLatitude(lats, newLat) {
    for (var i = 0; i < lats.length; i++) {
        var absLat = Math.abs(lats[i]);
        console.log(absLat);
        var absNewLat = Math.abs(newLat);
        console.log(absNewLat);
        var difference = absLat - absNewLat;
        console.log(difference);
        if (difference > -0.001 && difference < 0.001) {
            return true;
        }
    }
    return false;
}