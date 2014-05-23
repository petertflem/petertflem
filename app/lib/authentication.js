module.exports.auth = function(req, res, next) {
    //!req.isAuthenticated() ? res.send(401) : next();
    
    var authenticated = req.isAuthenticated();
    
    // For all non xhr requests the angular doesn't intercept
    if (!authenticated && !req.xhr)
        res.redirect('/users/login');
    else if (!authenticated)
        res.send(401);
    else
        next();
}