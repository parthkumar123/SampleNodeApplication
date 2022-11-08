"use strict";

module.exports = async (app) => {

    app.get("/data", async (request, response) => {
        try {
            response.json("Success");
        } catch (err) {
            response.send(err);
        }
    });

};
