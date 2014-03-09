var Plugin = require('./models/plugin.js'),
    fs = require('fs');

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function load_plugins(app, basepath) {
    Plugin.find(function(err, plugins){
        plugins.forEach(function(plugin){
            if (plugin)
            {
                // Load all url mappings under plugin's url_mapping folder
                var plugin_route_file = __dirname + '/url_mapping/externals/' + plugin.root +'/routes.js';
                fs.exists(plugin_route_file, function(exists) {
                    if (exists)
                    {
                        var plugin_routes = require(plugin_route_file);
                        plugin_routes.LoadRoutes(app, basepath, plugin.root);

                        console.log('\"' + plugin.name.trim() + '\" have just been loaded!');
                    }
                    else
                        console.warn('\"' + plugin.name.trim() + '\" routes were missing, please check them under url_mapping/externals.');
                });
            } else
                console.warn('unable to load plugin \"' + plugin.name.trim() + '\".')
        });
    });
}

module.exports.LoadPlugin = load_plugins;