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
    cookieParser(process.env.COOKIE_SECRET)
);



home = "/";
user = "/user";
api = "/api";
test_html = "/test_html";
static = "/";

if(process.env.MODE == "development"){
    potholeLink = "/pothole-patrol"
    home = potholeLink + home;
    user = potholeLink + user;
    api = potholeLink + api;
    test_html = potholeLink + test_html;
    static = potholeLink + static;
    app.get("/", (req, res) => {
        res.send("<a href='."+home+"'>Main page</a><br/>" +
        "<a href='."+test_html+"'>Backend test html link</a>");
    });
}

app.get(test_html, (req, res) => {
    res.sendFile(path.join(__dirname, "/test_html/backend_test.html"));
});

app.get(home, async (req, res) => {
    const frontendPath = path.join(__dirname, "../frontend/react-pwa/build/index.html");
    if(await fileExists(frontendPath)){
        res.sendFile(frontendPath);
    } else {
        res.send("No Build folder. <a href='./test_html'>Backend test html</a>");
    }
});

const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");
const { env } = require("process");

app.use(user, userRouter);
app.use(api, apiRouter);

app.use(static,express.static("../frontend/react-pwa/build"));

app.listen(port, () => {
    if(process.env.MODE == "development"){
        console.log("Server is available at: http://127.0.0.1:8106/");
    } else {
        console.log("Server is available at: https://portfolios.talentsprint.com/pothole-patrol/");
    }
    console.log(`Listening on port ${port}`);
});