var views = require('../lib/views');

module.exports = function (app, passport) {
    app.get('/users/login', function (req, res) {
        views.render(res, req, 'users/login');
    });
    
    app.post('/users/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/users/login'
    }));
    
    app.get('/users/logout', function(req, res) {
		req.logout();
		res.send(200);
	});
}