var fs = require('fs');

module.exports.initialize = function(app, passport, express) {
    app.use(express.static(__dirname + '\\..\\assets'));
    
    /*app.get('*', function (req, res, next) {
        req.xhr ? next() : res.render('layout/layout');
    });*/
    
    fs.readdirSync('app/controllers').forEach(function (controller) {
        require('../controllers/' + controller.replace('.js', ''))(app, passport);
    });
    
    app.get('*', function (req, res) {
        res.status(404);
        res.render('404/404');
    });
}