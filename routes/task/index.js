var User = require('../../models/user.js')

exports.index = function(req, res){
    console.log(req.headers['referer']);
    res.render('task/dashboard', { title: 'Express' });
};

exports.status = function(req, res){
    console.log(req.headers['referer']);
    User.find(function(error, users){
        var obj = {
            users : {
                total : users.length,
                death : 4,
                alive : 1,
                status : 'active'
            },
            connection : {
                connected_from : req.ip
            }
        }
        res.render('task/conn_report', obj);
    });
}