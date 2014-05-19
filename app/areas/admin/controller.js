var views = require('../../lib/views');
var auth = require('../../lib/authentication')

module.exports = function (app, passport) {
    app.get('/login', function (req, res) {
        views.render(res, 'admin/login');
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login'
    }));
    
    app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
    
    app.get('/admin', auth.isLoggedIn, function (req, res) {
        views.render(res, 'admin/index');
    });
    
    app.get(/\/admin.*/i, auth.isLoggedIn, function (req, res) {
        views.render(res, req.path.substring(1));
    });
}