module.exports.render = function(response, view, req, viewData) {
    response.render(view, viewData || {}, function (err, html) {
        req.xhr 
            ? response.end(html) 
            : response.render('layout/layout');
    });
}