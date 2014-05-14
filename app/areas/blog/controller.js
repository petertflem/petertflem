var views = require('../../views');
var auth = require('../../authentication');
var Post = require('../../models/post');

module.exports = function (app) {
    app.get('/', function (req, res) {
        Post.find(function (err, posts) {
            views.render(res, 'blog/home', 'home', { 'posts': posts });
        }).limit(10);
    });
    
    app.get('/blog/new-post', auth.isLoggedIn, function (req, res) {
        views.render(res, 'blog/new-post');
    });
    
    app.get(/\/blog.*/i, function (req, res) {
        views.render(res, req.path.substring(1));
    });
    
    /* This call should probably be done with ajax */
    app.post('/blog/create-post', auth.isLoggedIn, function (req, res) {
        var post = new Post();
        
        post.author = req.user._id;
        post.title = req.body.title;
        post.body = req.body.body;
        
        post.save(function (err) {
            if (err)
                throw err;
            
            console.log('post saved!');
        });
        
        res.redirect('/');
    });
}