const fetch = require("node-fetch");

const db = require("../database/connection");
const latlonDistance = require("../helpers/latlonDistance");


async function userMiddleware(req, res, next){
    //authenticate user and request

    //if all good: pass on to next()

    //else return error 401
}

module.exports = userMiddleware;