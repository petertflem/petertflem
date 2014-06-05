module.exports.auth = function(req, res, next) {
    
    // If it is a xhr request and the user isn't authenticated, send 401
    req.xhr && !req.isAuthenticated() ? res.send(401) : next();

}