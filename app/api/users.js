var auth = require('../middleware/authentication');

module.exports = function (app, passport) {
    
    /*
     * POST: /users/login
     */
    app.post('/users/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/users/login'
    }));
    
    /*
     * GET: /users/logout
     */
    app.get('/users/logout', auth.auth, function(req, res) {
        req.logout();
        res.send(200);
	});
}