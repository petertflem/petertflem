var views = require('../lib/views');

module.exports = function (app) {
    app.get('/projects', function (req, res) {
        views.render(res, req, 'projects/index');
    });
    
    //app.get(/\/projects.*/i, function (req, res) {
        //views.render(res, req, req.path.substring(1));
    //});
}