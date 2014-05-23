var Post = require('../models/post');
var views = require('../lib/views');

module.exports = function (app) {
    app.get('/blog', function (req, res) {
        Post.find(function (err, posts) {
            views.render(res, req, 'blog/index', { 'posts': posts });
        }).limit(10);
    });
    
    //app.get(/\/blog.*/i, function (req, res) {
        //views.render(res, req, req.path.substring(1));
    //});
}