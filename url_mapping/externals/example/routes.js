// Plugin routes go here
function load_routes(app, basepath, plugin_root) {
    var helper = require(basepath + '/routes/helpers/auth'),
        home = require(basepath + '/routes/externals/example/index');

    app.get('/' + plugin_root.trim() + '/test', home.index);
}

module.exports.LoadRoutes = load_routes;