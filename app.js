
/**
 * Module dependencies.
 */

var express         = require('express'),
    http            = require('http'),
    fs              = require('fs'),
    helmet          = require('helmet'),
    favicon         = require('serve-favicon'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    cookieParser    = require('cookie-parser'),
    cookieSession   = require('cookie-session'),
    morgan          = require('morgan'),
    csrf            = require('csurf'),
    errorHandler    = require('errorhandler'),
    serveStatic     = require('serve-static'),
    path            = require('path'),
    config          = require('./config'),
    routes          = require('./routes'),
    app             = express();

// Configuration ===========================================================================================================

var env = process.env.NODE_ENV || 'development';

// Development specific settings ===========================================================================================
if (env === 'development') {
  app.use(errorHandler());
}
else {

}

app.set('port', process.env.PORT || config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');

// app.use(favicon("public/images/favicon.ico"));
app.use(helmet());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(favicon());

app.use(morgan('combined'))

app.use(methodOverride());

app.use(app.router);

app.use(require('less-middleware')(path.join(__dirname + '/public')));

app.use(serveStatic(__dirname + '/public'));      // set the static files location

app.get('/', routes.index);
app.get('/signed', routes.signed);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
