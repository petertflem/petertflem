var auth = require('../lib/authentication');
var views = require('../lib/views');

module.exports = function (app, passport) {
    app.get('/admin', auth.auth, function (req, res) {
        views.render(res, req, 'admin/index');
    });
    
    //app.get(/\/admin.*/i, auth.auth, function (req, res) {
        //views.render(res, req, req.path.substring(1));
    //});
}