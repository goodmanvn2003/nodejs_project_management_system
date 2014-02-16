exports.authenticate_user = function(req, res) {
    res.render('user/user_login');
}

exports.config = function(req, res){
    res.render('user/user_profile');
}