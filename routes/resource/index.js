var fs = require('fs');

exports.upload = function(req, res) {
    var uploaded = req.files.uploadedFile,
        basePath = process.cwd();
    console.log(uploaded.path);
    console.log(process.cwd());

    fs.rename(uploaded.path, basePath + "/repository/uploads/" + uploaded.name, function(err) {});
    res.end("success");
}

exports.index = function(req, res) {
    res.render('resource/management', { resource: 'active', user_name : req.session.user_name, user_role : req.session.user_role, project_name: req.session.project_name });
}