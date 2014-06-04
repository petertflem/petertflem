var auth = require('../middleware/authentication');
var fs = require('fs');

module.exports.initialize = function(app, passport, express) {
    app.use(express.static(__dirname + '\\..\\assets'));
    
    fs.readdirSync('app/api').forEach(function (file) {
        require('../api/' + file.replace('.js', ''))(app, passport);
    });
    
    app.get('/admin', auth.auth);
    app.get('/admin/:view', auth.auth);
    
    app.get('*', function (req, res) {
        req.xhr ? renderView(res, req) : res.render('layout/layout'); 
    });
}

function renderView(res, req) {
    res.render(req.path.substring(1), function (error, html) {
        error ? res.render('404/404') : res.send(html);
    });
}