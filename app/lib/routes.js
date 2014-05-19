var fs = require('fs');
var views = require('./views');

module.exports.initialize = function(app, passport, express) {
    var areas = fs.readdirSync('app/controllers');
    
    areas.forEach(function (area) {
        require('../controllers/' + area.replace('.js', ''))(app, passport);
    });
    
    app.use(express.static(__dirname + '\\..\\assets'));
    
    app.get('*', function (req, res) {
        res.status(404);
        views.render(res, '404/404');
    });
}