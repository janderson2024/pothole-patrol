const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const path = require("path");
const fileExists = require("./helpers/fileExists");

const app = express();
const port = 8106;

app.use(
    bodyParser.json({extended: false}), 
    bodyParser.urlencoded({extended: false}),
    cookieParser()
);

app.get("/", async (req, res) => {
    if(process.env.MODE == "production"){
        const frontendPath = path.join(__dirname, "../frontend/react-pwa/build/index.html");
        if(await fileExists(frontendPath)){
            res.sendFile(frontendPath);
        } else {
            res.send("!ERROR!: the react pwa project has not been built yet! " + 
            "go to the frontent/react-pwa folder and run \"npm run build\"!");
        }
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
    if(process.env.MODE == "development"){
        console.log("Server is available at: http://127.0.0.1:8106/");
    } else {
        console.log("Server is available at: https://portfolios.talentsprint.com/pothole-patrol/");
    }
    console.log(`Listening on port ${port}`);
});