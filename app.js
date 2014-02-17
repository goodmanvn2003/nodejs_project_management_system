
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// MongoDB
var mongo = require('mongoose');
mongo.connect('mongodb://root:mylordjesus@localhost/pm');

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
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var user = require('./routes/user'),
    task = require('./routes/task');

// app routes
// GET
app.get('/', user.authenticate_user);
app.get('/task', task.index);
app.get('/task/dashboard', task.index);
app.get('/task/status', task.status);
app.get('/user/:id/dashboard', user.config);
app.get('/login', user.authenticate_user);
// POST
app.post('/user/do_login', user.do_authenticate);

socketManager.SocketBind(socketManager.SocketInit(server));

// create server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
