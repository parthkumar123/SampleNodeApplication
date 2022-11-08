"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const process = require("process");
const https = require("https");
const fs = require("fs");

const CommonController = {

    appStarted: function (routesPath, EndPointURL, EndPointName) {
        try {
            // Express configuration
            let app = express();
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            let cors = require("cors");
            app.use(cors());

            app.get("/error", function (req, res, next) {
                throw new Error("Problem occurred");
            });

            // routes configuration
            let routes = require(routesPath);
            routes(app);

            // https server configuration
            const options = {
                key: fs.readFileSync("/etc/pki/tls/private/localhost.key"),
                cert: fs.readFileSync("/etc/pki/tls/certs/localhost.crt")
            };

            // !Warning: it will allow the unauthorized user
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

            if (EndPointURL.indexOf("|")) {
                let endpointSplit = EndPointURL.split("|");
                https.createServer(options, app).listen(parseInt(endpointSplit[1]), endpointSplit[0], () => {
                    console.log(EndPointName + " App listening on https://" + endpointSplit[0] + ":" + endpointSplit[1]);
                });
            } else {
                let endpointSplit = EndPointURL;
                https.createServer(options, app).listen(parseInt(endpointSplit[1]), endpointSplit[0], () => {
                    console.log(EndPointName + " App listening on https://" + endpointSplit[0] + ":" + endpointSplit[1]);
                });
            }
        } catch (err) {
            console.log("CommonController", err);
        }
    }

};

process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
});

module.exports = CommonController;