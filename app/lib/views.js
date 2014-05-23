module.exports.render = function(response, req, view, viewData) {
    req.xhr ? response.render(view, viewData || {}) : response.render('layout/layout')
}