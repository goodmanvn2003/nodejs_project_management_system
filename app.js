
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var flash = require('express-flash');

// MongoDB
var mongo = require('mongoose');
mongo.connect('mongodb://localhost/pm');

// SocketIO
var socketManager = require('./socket/socket.js');

var app = express();
var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/repository/tmp',
    limit: '10mb'
}));
app.use(express.methodOverride());
app.use(express.cookieParser('lordey'));
app.use(express.session({ cookie: { maxAge: 3600000 }}));
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var routesLoader = require('./url_mapping/routes.js');
routesLoader.LoadRoutes(app);

socketManager.SocketBind(socketManager.SocketInit(server));

// Load plugins
var Plugin = require('./plugin');
Plugin.LoadPlugin(app, __dirname);

// create server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
