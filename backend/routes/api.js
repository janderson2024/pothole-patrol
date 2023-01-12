const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("API Page");
    console.log("API route successful");
});

module.exports = router;