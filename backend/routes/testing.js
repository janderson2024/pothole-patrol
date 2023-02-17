const express = require("express");
const router = express.Router();
const path = require("path");

const userMiddleware = require("./userMiddleware");

router.post("/middleware", userMiddleware, (req, res) => {
    console.log("On the api side...");
    console.log(req.user);
    console.log(req.geoData);
    console.log(req.latitude);
    console.log(req.longitude);
    res.json({"nerd": "true"});
});

router.post("/frontend", userMiddleware, (req, res) => {
    console.log("The frontend made a request to this api!");

    res.json({"success": "Data was recieved and will be saved", "lat" : req.body.latitude, "long" : req.body.longitude});
});

router.get("/console", (req, res) => {
    if(process.env.MODE != "production"){
        return res.send("You are not on the server. You dont need to access this!");
    }
    if(req.cookies["test_html_key"] != process.env.TEST_HTML_KEY){
        return res.send("Imagine trying to bypass my checks lmaoooooooo");
    }
    res.sendFile(path.join(__dirname, "../output.txt"));
});


module.exports = router;