const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = 8106;

app.use(
    bodyParser.json({extended: false}), 
    bodyParser.urlencoded({extended: false})
);


app.get("/", (req, res) => {
    res.send("Pothole Patrol");
    console.log("Get index successful");
});

const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");

app.use("/user", userRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});