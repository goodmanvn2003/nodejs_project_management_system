var User = require('../../models/user.js')

exports.index = function(req, res){
    res.render('task/dashboard', { title: 'Dashboard', dashboard: 'active', user_name : req.session.user_name, user_role : req.session.user_role });
};

exports.status = function(req, res){
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