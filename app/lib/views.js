module.exports.render = function(response, view, req, viewData) {
    req.xhr ? response.render(view, viewData || {}) : response.render('layout/layout')
}