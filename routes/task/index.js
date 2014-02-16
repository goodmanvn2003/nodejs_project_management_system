var User = require('../../models/user.js')

exports.index = function(req, res){
    res.render('task/dashboard', { title: 'Express' });
};

exports.status = function(req, res){
    console.log(User);
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