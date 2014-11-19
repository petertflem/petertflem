var Post = require('../models/post');

module.exports = function (app) {
    
    /*
     * GET: /posts.json
     */
    app.get('/posts.json', function (req, res) {
        Post.find({}).sort('-date').exec(function (err, posts) {
            err ? res.send(500) : res.json(posts);
        });
    });
    
}