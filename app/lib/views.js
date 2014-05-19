module.exports.render = function(response, view, title, viewData) {
    response.render(view, viewData || {}, function (err, html) {
        response.render('shared/root', {
            body: html,
            title: title || view
        });
    });
}