// Load Crypto
var crypto = require('crypto');

// Load models
var User = require('../../models/user.js');
var Project = require('../../models/project.js');


exports.authenticate_user = function(req, res) {
    if (req.session.session_id !== null && req.session.session_id !== undefined)
    {
        res.redirect('/task');
    }
    res.render('user/user_login');
}

exports.do_authenticate = function(req, res) {
    User.findOne({ user_name : req.body.username,
                password_hash : (crypto.createHash('sha256').update(req.body.password)).digest('hex')}, function(err, user)
    {
        if (!err)
        {
            if (user !== null && user !== undefined)
            {
                Project.findOne({ users: {$in: [user._id] }, name: req.body.project }, function(err, project){
                    if (project)
                    {
                        req.session.session_id = (crypto.createHash('sha256').update((new Date()).toUTCString())).digest('hex');
                        req.session.user_id = user._id;
                        req.session.user_name = user.user_name;
                        req.session.user_role = user.role;
                        req.session.project_id = project._id;
                        req.session.project_name = project.name;
                        res.redirect('/task/dashboard');
                    } else
                    {
                        req.flash('error', 'Incorrect project ID');
                        res.redirect('/login');
                    }
                })
            }
            else
            {
                req.flash('error','Incorrect credentials');
                res.redirect('/login');
            }
        } else
            res.end('ERR: Could not contact database');
    });
}

exports.do_logout = function(req, res) {
    req.session.session_id = null;
    req.session.user_id = null;
    res.json({ status: 'logged out' });
}

exports.index = function(req, res){
    res.render('user/user_profile', { user_name : req.session.user_name, user_role : req.session.user_role, project_name: req.session.project_name });
}

exports.list = function(req, res){
    res.render('user/users_list', { user_name : req.session.user_name, user_role : req.session.user_role, project_name: req.session.project_name });
}