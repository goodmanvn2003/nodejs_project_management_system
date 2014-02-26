var auth_required = function(req, res, next) {
    if (req.session.session_id === null || req.session.session_id === undefined)
    {
        res.redirect('/login');
    }
    next();
}

module.exports.AuthRequired = auth_required;