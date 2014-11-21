var auth = require('../middleware/authentication');
var Post = require('../models/post');
var ObjectId = require('mongoose').Types.ObjectId;
var slug = require('slug');

module.exports = function (app) {
    
    /*
     * POST: /post/save
     */
    app.post('/post/save', auth.auth, function (req, res) {
        var post = new Post();
        
        post.author.name = req.user.getName();
        post.author.id = req.user._id;
        post.title = req.body.title;
        post.slug = slug(post.title); // Need to check if the slug is unique
        post.body = req.body.body;
        
        // We have to do this, else the upsert will fail
        var obj = post.toObject();
        delete obj._id;
        
        // Either creates or updates the post
        Post.update({ _id: req.body._id || ObjectId() }, obj, { upsert: true }, function (err, numberAffected, raw) {
            err && res.send(500);
            
            var reply = {
                updatedExisting: !!raw.updatedExisting,
                id: !raw.updatedExisting && raw.upserted[0]._id
            };
            
            res.send(200, reply);
        });
    });
    
    /*
     * GET: /posts/find-one?id=...
     */
    app.get('/post/find-one', function (req, res) {
        Post.findOne({ 'slug': req.query.slug }, function (err, post) {
            err ? res.send(500) : res.json(post);
        });
    });
}