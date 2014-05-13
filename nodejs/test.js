exports.start  = function() {
    
    var log     = require('logule').init(module); //suitable logger
    log.debug ("Spawning new worker");


    
    /*
        Basic dependencies [start]
    */
    var print_r       = require('print_r').print_r;
    
    //Include the config file
    global.rootDir = __dirname;
    var config = require('./config/config.js')();
    global.config = config;

    //use express framework
    var express       = require('express');
    var app           = express();
    module.exports = app;
    
    //Connect middleware
    var bodyParser = require('body-parser');
    
    //Http Auth (actually even a bit more complex system, but it can be used for our need as well)
    global.passport  = require('passport');
    var BasicStrategy = require('passport-http').BasicStrategy;

    //MongoDB
    app.mongoose  = require ('mongoose'); //ODM for MongoDb

    //adding log
    app.log       = log; //adding log
    global.log    = log;

    var models        = {}; //We will place all the models here

    /*
       Basic dependencies [end]
    */

    //add configurer
    var configurerParams = {
        express: express,
        app: app,
        models: models,
        print_r: print_r,
        bodyParser: bodyParser,
        BasicStrategy: BasicStrategy,
        
    };
    var configurer    = require('./configurer.js')(configurerParams); // configure modules 

    // Routing file (for the file structure of the project)
    require(config.routesFolder+'/routes.js')(app, models);
    /*
    app.get('/', function (req, res) {  
        res.send('API is running');  
    });
*/

    app.listen (config.processPort);

    //log.info print_r(config)
    log.info (config.processPort);
    //log.info "Express server listening on port #{config.processPort}"
}