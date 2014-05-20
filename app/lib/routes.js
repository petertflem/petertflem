var fs = require('fs');
var views = require('./views');

module.exports.initialize = function(app, passport, express) {
    var controllers = fs.readdirSync('app/controllers');
    
    controllers.forEach(function (controller) {
        require('../controllers/' + controller.replace('.js', ''))(app, passport);
    });
    
    app.use(express.static(__dirname + '\\..\\assets'));
    
    app.get('*', function (req, res) {
        res.status(404);
        res.render('404/404');
    });
}