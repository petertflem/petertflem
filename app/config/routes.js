var auth = require('../middleware/authentication');
var fs = require('fs');

module.exports.initialize = function(app, passport, express) {
    
    // Serves static content like CSS and JavaScript
    app.use(express.static(__dirname + '\\..\\assets'));
    
    // This binds up all of the api data endpoints
    fs.readdirSync('app/api').forEach(function (file) {
        require('../api/' + file.replace('.js', ''))(app, passport);
    });
    
    // Routes that need authentication
    app.get('/admin', auth.auth);
    app.get('/admin/*', auth.auth);
    app.get('/post/edit', auth.auth);
    
    // This route handles the rendering of every view in the application.
    app.get('*', function (req, res) {
        
        // If the request isn't xhr, we haven't authenticated it, which is why
        // it is important that it only returns the base layout. Angular
        // will request the partial view, which contains the specfic parts
        // we want to hide with authentication.
        req.xhr ? renderView(res, req) : res.render('layout/layout'); 
    });
}

/*
 * Helps me render a view requested with an XHR request.
 * Returns the 404 view if the requested view isn't found.
 * At this point we just guess that every error that can
 * happen when trying to render a view should produce
 * a 404 error. This is probably not entirely correct.
 */
function renderView(res, req) {
    res.render(req.path.substring(1), function (error, html) {
        error ? res.status(404).render('404/404') : res.send(html);
    });
}