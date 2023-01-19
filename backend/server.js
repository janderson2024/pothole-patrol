const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8106;

app.use(
    bodyParser.json({extended: false}), 
    bodyParser.urlencoded({extended: false})
);


app.get("/", (req, res) => {
    if(process.env.MODE == "production"){
        res.sendFile(path.join(__dirname, "../frontend/react-pwa/build/index.html"));
    } else {
        res.send("Backend Dev server :)");
    }
    console.log("Get index successful");
});

const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");

app.use("/user", userRouter);
app.use("/api", apiRouter);

app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});