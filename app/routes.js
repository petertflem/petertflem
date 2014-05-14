var fs = require('fs');
var views = require('./views');

module.exports.initialize = function(app, passport, express) {
    var areas = fs.readdirSync('areas');
    
    areas.forEach(function (area) {
        if (!fs.existsSync('./areas/' + area + '/controller.js'))
            return;
        
        require('./areas/' + area + '/controller')(app, passport);
    });
    
    app.use(express.static(__dirname));
    
    app.get('*', function (req, res) {
        views.render(res, 'shared/404');
    });
}