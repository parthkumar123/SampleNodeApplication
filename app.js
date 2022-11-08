const config = require('./config.js');
const cmnController = require("./CommonController");
const connectionwithmongoDB = require("./Database/mongoose");

// to call the dependancy function
(() => {
    try {
        // API 
        if (config.API === 'ON') {
            // route api call
            cmnController.appStarted('./Routes/index.js', config.Api_EndPoint, "Sample");

            // database connection
            connectionwithmongoDB();
        };
    } catch (err) {
        console.log(err);
    }
})();