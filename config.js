const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + ".env")
});

module.exports = {
    API: process.env.API,
    Api_EndPoint: process.env.Api_EndPoint,

    Mongo_URL: process.env.Mongo_URL
}; 