exports.start  = function() {
    
    //Include the config file
    global.rootDir = __dirname;
    var config = require('./config/config.js')();
    global.config = config;

    //use express framework
    var express       = require('express');
    var app           = express();
    module.exports = app;
    
    //adding log
    var log     = require('logule').init(module); //suitable logger
    app.log       = log; //adding log
    global.log    = log;

    //Connect middleware
    var bodyParser = require('body-parser');
    
    //Http Auth (actually even a bit more complex system, but it can be used for our need as well)
    global.passport  = require('passport');
    var BasicStrategy = require('passport-http').BasicStrategy;

    //MongoDB
    app.mongoose  = require ('mongoose'); //ODM for MongoDb
    
    //We will place all the models here
    var models        = {}; 
 
    //Configure modules, etc
    var configurerParams = {
        express: express,
        app: app,
        models: models,
        bodyParser: bodyParser,
        BasicStrategy: BasicStrategy,
    };
    var configurer    = require('./configurer.js')(configurerParams); // configure modules 

    //Routing file (for the file structure of the project)
    require(config.routesFolder+'/routes.js')(app, models);

    app.listen (config.processPort);

    log.info (config.processPort);
}