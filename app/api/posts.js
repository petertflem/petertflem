var Post = require('../models/post');

module.exports = function (app) {
    
    /*
     * GET: /posts
     */
    app.get('/posts', function (req, res) {
        Post.find(function (err, posts) {
            err ? res.send(500) : res.json(posts);
        }).limit(10);
    });
    
}