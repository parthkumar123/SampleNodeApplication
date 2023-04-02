"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const process = require("process");

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

			let endpointSplit = EndPointURL.split("|");
			app.listen(endpointSplit[1], () => {
				console.log(EndPointName + " App listening on http://" + endpointSplit[0] + ":" + endpointSplit[1]);
			});
		} catch (err) {
			console.log("CommonController", err);
		}
	}

};

process.on("uncaughtException", (err) => {
	console.log("uncaughtException", err);
});

module.exports = CommonController;