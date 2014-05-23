var auth = require('../lib/authentication');
var Post = require('../models/post');
var views = require('../lib/views');

module.exports = function (app) {
    app.get('/blog/post/edit', auth.auth, function (req, res) {
        views.render(res, req, 'post/edit');
    });
    
    /* This call should probably be done with ajax */
    app.post('/blog/post/save', auth.auth, function (req, res) {
        var post = new Post();
        console.log(req);
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