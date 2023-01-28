const { application } = require("express");
const express = require("express");
const router = express.Router();
const userMiddleware = require("./userMiddleware");
const db = require("../database/connection");

router.get("/", (req, res) => {
    res.send("API page");
    console.log("API route successful");
});

//Add hard-coded sample pothole
router.get("/submitpothole", async (req, res) => {
    console.log("Adding pothole to database");
    let pothole = {
        city : "Des Moines", 
        zipcode: "50311",
        report_count: 1,
        status: "Not completed",
        approx_latitude: "41.6039",
        approx_longitude: "-93.6585"
    };
    let sql = "INSERT INTO potholes SET ?";
    let query =  await db.query(sql, pothole, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Pothole added");
    });
    console.log("Pothole added correctly");
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

    res.send({"success": "Data was totally saved in the database"});
})

module.exports = router;

/*app.get("/potholes_in_city/:city", async (req, res) => {
    sql = 'SELECT ID, approx_latitude, approx_longitude FROM `Potholes` WHERE `city` = ?';
    const [results] = await db.query(sql, [req.params.city]);
    console.log(results);
    //format and res.json()
});*/