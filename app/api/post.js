var auth = require('../middleware/authentication');
var Post = require('../models/post');

module.exports = function (app) {
    
    /*
     * POST: /post/save
     */
    app.post('/post/save', auth.auth, function (req, res) {
        var post = new Post();
        console.log(req.user);
        post.author.name = req.user.getName();
        post.author.id = req.user._id;
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