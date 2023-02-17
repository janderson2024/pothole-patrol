const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const router = express.Router();
const latlonDistance = require("../helpers/latlonDistance");

const userMiddleware = require("./userMiddleware");
const db = require("../database/connection");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../test_html/routes_test.html"));
});


router.post("/generate", async (req, res) => {
    const source = [req.body.source.lat, req.body.source.lng];
    const destination = [req.body.dest.lat, req.body.dest.lng];

    if(!(source[0] && source[1] && destination[0] && destination[1])){
        return res.status(401).json({"missing data":"You need both a source and destination position!"});
    }

    const dist = latlonDistance(source[0], source[1], destination[0], destination[1]);
    if(dist >= 500){
        return res.status(401).json({"too big": "the distance between the two points cannot be greater than 500km"});
    }

    //get city for the two points
    //TODO

    //get all potholes in those two cities
    //const getPotholes = "SELECT * FROM `Potholes` WHERE `city` = ? OR `city` = ?";
    //const [results] = await db.query(getPotholes, [city1, city2]);

    const getPotholes = "SELECT * FROM `Potholes`";
    const [results] = await db.query(getPotholes);

    //make geoAPI url
    var geoUrl = "https://api.geoapify.com/v1/routing";
    var waypoints = "?waypoints=" + source.join(",") + "|" + destination.join(",");
    var mode = "&mode=drive";
    var avoid_string = "";
    const apiKey = "&apiKey=" + process.env.GEOAPIFY_KEY;

    if(results.length > 0){
        avoid_string = "&avoid=";
        for(result of results){
            if((result.approx_latitude != source[0] || result.approx_longitude != source[1])
            || (result.approx_latitude != destination[0] || result.approx_longitude != destination[1])){
                avoid_string += "location:" + result.approx_latitude + "," + result.approx_longitude + "|";
            }
        }
        avoid_string = avoid_string.slice(0, -1);
    }

    var geoUrl = geoUrl + waypoints + mode + avoid_string + apiKey;

    console.log(geoUrl);
    //make API request
    const fetchResp = await fetch(geoUrl);
    const geoData = await fetchResp.json();
    console.log(geoData);

    {/* understanding the output
    geoData will be an object with "features", "properties", and "type"

    features is an array, of "features". Each item represents a route api call
        -since we are only doing 1 route call with 2 waypoints: this will always be 0

    instead we can return just that one feature. That feature has "geometry" "properties" and "type"
        -the type will always be "Feature"
        -geometry is what Leaflet GeoJSON will use to draw the map
        -properties are just details about that "feature"

    Because feature has its own properties with the same info, we dont need to do anything with the top level properties or type

    We just need to return data from features[0]

    features[0].properties has:
        - avoid[0]: list of lat/lon pairs for the potholes
        - distance: distance the route takes
        - distance_unites: meters
        - legs: will explain later
        - mode: "drive" (not needed)
        - time: estimated time in seconds
        - units: "metric" (not needed)
        - waypoints: starting and ending location. (not needed) 
    
    Legs. Legs is a list of legs in the journey. Since we are doing 2 points, there is 1 leg.
    Each leg has the distance and time for that leg (but for us its the whole journey)

    The leg also has each "step" which has a "from index", "to index", "distance", "time", and "instructions"

    the from_index relates to the feature.geometry.coordinates[leg_index][from_index] coords
        - leg_index is just 0 since theres only 1 leg

    to_index is the same as from, but just the end point of the leg (its not needed)

    distance and time are just their respective values for that part of the journey (maybe wanted, but not now)

    instruction is an object with a "text" which is just the directions for that "step"

    */}
    
    if(geoData.error){
        return res.status(401).json({"geoData error": geoData.message});
    }

    returnGeoJson = {
        geometry: geoData.features[0].geometry,
        properties: geoData.features[0].properties,
        type: "Feature"    
    }

    //send it to user
    res.json(returnGeoJson);
});

module.exports = router;