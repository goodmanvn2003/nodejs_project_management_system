// controllers
var helper = require('../routes/helpers/auth');
var user = require('../routes/user'),
    task = require('../routes/task'),
    restful = require('../routes/restful');

function load_routes(app) {
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
}

module.exports.LoadRoutes = load_routes;