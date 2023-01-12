const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User Page");
    console.log("User route successful");
});

router.post("/", (req, res) => {
    res.send("Create User Form");
    console.log("User post successful");
});

router.get("/:userID", (req, res) => {
    const userID = req.params.userID
    res.send(`Get User with ID ${userID}`);
});

router.put("/:userID", (req, res) => {
    const userID = req.params.userID
    res.send(`Update User with ID ${userID}`);
});

router.delete("/:userID", (req, res) => {
    const userID = req.params.userID
    res.send(`Delete User with ID ${userID}`);
});

module.exports = router;

