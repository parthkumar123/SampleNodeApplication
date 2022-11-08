"use strict";
const mongoose = require("mongoose");
const config = require("../config");

function connectionwithmongoDB() {
    try {
        mongoose.connect(config.Mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected with database");
        }).catch((error) => {
            throw error;
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectionwithmongoDB;
