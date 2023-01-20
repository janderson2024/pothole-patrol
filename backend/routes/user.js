const { response } = require("express");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//temporary testing user_register_test
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../test_html/user_register_test.html"));
});

/* NOTES ON IP GEOLOCATION
https://dev.maxmind.com/geoip/geolite2-free-geolocation-data?lang=en
  - free database we can download and do geoip based off. 
  - seems VERY innacurate unless its 100km+ "accuracy range". even then its 73%

https://db-ip.com/db/download/ip-to-city-lite
  -free database we can download and do geoip off of. 
  -77% accurate

https://ip-api.com/docs/api:json
  -free api 
  -rate limit of 75 per minute which shouldnt be an issue.
  -also might not be under "acceptable commercial ussage" but idk
  -most accurate that I tried

  http://ip-api.com/json/[ip]

https://apidocs.geoapify.com/playground/ip-geolocation/
 - uses the ip-to-city-lite...
 */


//maybe also take in LAT/LON as a way to make sure the user has location services on
//takes in user agent, ip address
//gets the city from the ip address
//sets reliability to 1
//last_report is set to now

router.post("/register", async (req, res) => {
    //get user IP
    const ip = req.ip;

    //fetch the ip geolocation data from the ip-api API
    const apiUrl = "http://ip-api.com/json/" + ip;
    fetchResp = await fetch(apiUrl);
    ipGeoLocationData = await fetchResp.json();

    //get the user agent
    const userAgent = req.header("user-agent");
    const userReliability = 1;


    //testing console.logs
    console.log("IP: " + ip);
    //console.log(ipGeoLocationData);
    console.log("User Agent: " + userAgent);

    const cookieName = "uID";
    const uidValue = "example1234";
    console.log("UID COOKIE: " + req.cookies[cookieName]);

    //milli in sec * sec in min * min in hr * hr in day * day in month
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    res.cookie(cookieName, uidValue, {maxAge: oneMonth}).json({cookieName : uidValue})

});

module.exports = router;

