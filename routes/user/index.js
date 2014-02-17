// Load Crypto
var crypto = require('crypto');

// Load models
var User = require('../../models/user.js');


exports.authenticate_user = function(req, res) {
    res.render('user/user_login');
}

exports.do_authenticate = function(req, res) {
    User.findOne({ user_name : req.body.username,
                password_hash : (crypto.createHash('sha256').update(req.body.password)).digest('hex')}, function(err, user)
    {
        if (!err)
        {
            if (user !== null && user !== undefined)
                res.redirect('/task/dashboard');
            else
                res.redirect('/login');
        } else
            res.end('ERR: Could not contact database');
    });
}

exports.config = function(req, res){
    res.render('user/user_profile');
}