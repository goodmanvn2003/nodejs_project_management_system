var auth_required = function(req, res, next) {
    if (req.session.session_id === null || req.session.session_id === undefined)
    {
        console.log('hit here');
        res.redirect('/login');
    } else
        next();
}

module.exports.AuthRequired = auth_required;