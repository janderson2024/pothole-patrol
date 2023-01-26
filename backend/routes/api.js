const { application } = require("express");
const express = require("express");
const router = express.Router();
const userMiddleware = require("./userMiddleware");

router.get("/", (req, res) => {
    res.send("API page");
    console.log("API route successful");
});

router.post("/mid_test", userMiddleware, (req, res) => {
    console.log("On the api side...");
    console.log(req.user);
    console.log(req.geoData);
    console.log(req.latitude);
    console.log(req.longitude);
    res.send({"nerd": "true"});
});

module.exports = router;

/*app.get("/potholes_in_city/:city", async (req, res) => {
    sql = 'SELECT ID, approx_latitude, approx_longitude FROM `Potholes` WHERE `city` = ?';
    const [results] = await db.query(sql, [req.params.city]);
    console.log(results);
    //format and res.json()
});*/