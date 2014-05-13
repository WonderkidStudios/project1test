module.exports = function() {
    
    var config = this;
    
    /*
        Important - this is development/production switch (can also be set from command line before running app, like NODE_ENV=production node app.js)
    */
    process.env.NODE_ENV = 'development';
    
    //dev DB info
    this.dev_mongoDdUrl = "mongodb://localhost/tmpmedia_service";
    this.dev_mongoDdUrlOptions  =  {
            //db: { native_parser: true },
            user: 'tmpmedia',
            pass: '123456'
    };

    //prod DB info
    this.prod_mongoDdUrl = 'mongodb://localhost';
    this.prod_mongoDdUrlOptions     = {
            //db: { native_parser: true },
            user: 'some_username',
            pass: 'some_password'
    };

    this.publicFolder   = global.rootDir + '/public';
    this.cssFolder      = this.publicFolder + '/css';
    this.imgFolder      = this.publicFolder + '/img';
    this.jsFolder       = this.publicFolder + '/js';

    this.modelsFolder   = global.rootDir + '/schemes';
    this.routesFolder   = global.rootDir + '/routes';

    this.modulesDir      = global.rootDir + '/modules';
    this.templatesFolder = global.rootDir + '/modules';


    this.processPort    = process.env.PORT || 3000; // (can also be set from command line before running app, like PORT=production node app.js)

    //hardcoded users with log/pas for basic http authentication
    this.http_users = [
        { username: 'system', password: 'Sy5t3m' },
        
    ];

    return (this);

}