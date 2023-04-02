"use strict";

module.exports = async (app) => {

    app.get("/data", async (request, response) => {
        try {
            response.status(200).send({
                STATUS: "OK",
                RESPONSE: {
                    TEXT: "SUCCESS"
                }
            });
        } catch (err) {
            response.status(400).send({
                STATUS: "ERROR",
                RESPONSE: {
                    TEXT: err.message
                }
            });
        }
    });

};
