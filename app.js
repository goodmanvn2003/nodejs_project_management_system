
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
app.use(express.methodOverride());
app.use(express.cookieParser('lordey'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// controller helpers
var helper = require('./routes/helpers/auth');

// controllers
var user = require('./routes/user'),
    task = require('./routes/task'),
    restful = require('./routes/restful');

// app routes
app.get('/', user.authenticate_user);

/* task routes */
app.all('/task*', helper.AuthRequired);
app.get('/task', task.index);
app.get('/task/dashboard', task.index);
app.get('/task/status', task.status);
/* user routes */
app.all('/user*', helper.AuthRequired);
app.get('/user/:id', user.index);
app.get('/user/:id/dashboard', user.index);
/* login routes */
app.get('/login', user.authenticate_user);
app.post('/login/local', user.do_authenticate);
app.delete('/login/local/delete', user.do_logout);
/* restful interface */
app.get('/api/test', restful.test);

socketManager.SocketBind(socketManager.SocketInit(server));

// create server
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
