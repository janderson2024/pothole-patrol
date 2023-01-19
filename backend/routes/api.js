const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("API Page");
    console.log("API route successful");
});

module.exports = router;

/*app.get("/potholes_in_city/:city", async (req, res) => {
    sql = 'SELECT ID, approx_latitude, approx_longitude FROM `Potholes` WHERE `city` = ?';
    const [results] = await db.query(sql, [req.params.city]);
    console.log(results);
    //format and res.json()
});*/