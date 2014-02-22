var auth_required = function(req, res, next) {
    if (req.cookies.session_id === null || req.cookies.session_id === undefined)
    {
        console.log('getting into there');
        res.redirect('/login');
    }
    next();
}

module.exports.AuthRequired = auth_required;