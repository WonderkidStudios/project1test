module.exports = function(rootObj) {
  var app, configurer, connectDomain, express, models;
  configurer = this;
  app = rootObj.app;
  express = rootObj.express;
  connectDomain = rootObj.connectDomain;
  models = rootObj.models;
  bodyParser = rootObj.bodyParser;
  BasicStrategy = rootObj.BasicStrategy;

  log.info(config.dev_mongoDdUrl);
  

  //Middleware
  app.use(bodyParser());
  
  
  //Errors handling
  app.use(function(err, req, res, next) {
    log.error(err.stack);

    res.send(500, 'Something broke!');
  });
  
  log.info (app.get('env'));

  if ('development' == app.get('env')) {
    app.mongoose.connect(config.dev_mongoDdUrl, config.dev_mongoDdUrlOptions);
  };
  
  if ('production' == app.get('env')) {
    app.mongoose.connect(config.prod_mongoDdUrl, config.prod_mongoDdUrlOptions);
  };

 
  //Loading DB schemas/modules [start]
  models.Notes = require(config.modelsFolder + '/Notes/Notes.js')(app.mongoose).model;
  //Loading DB schemas/modules [end]

  //Set mandatory headers
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers','Origin,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Max-Age', '10');
    res.setHeader('Content-Type', 'application/json');
    return next();
  });

  //HTTP AUTH [start]
  app.use(passport.initialize());
  var auth = require(config.modulesDir + '/auth/auth.js');
  
  //   Use the BasicStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, a username and password), and invoke a callback
  //   with a user object.
  passport.use(new BasicStrategy({},auth.asynchronousVerification ));

  //HTTP AUTH [end]


  return configurer;
};