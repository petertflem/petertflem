var auth = require('../middleware/authentication');
var Post = require('../models/post');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function (app) {

  /*
   * POST: /post/save
   */
  app.post('/post/save', auth.auth, function (req, res) {
    
    Post.findById(req.body._id, function (err, post) {
      post = post || new Post();
      
      post.author = req.user._id;
      post.title = req.body.title;
      post.body = req.body.body;
      
      post.save(function (err, object) {
        err && res.send(500);
        res.status(200).send({ id: object._id });
      });  
    });
    
  });

  /*
   * GET: /posts/find-one
   * Query string parameters: id=... or slug=...
   */
  app.get('/post/find-one', function (req, res) {
    var findCriteria = req.query.slug ? { slug: req.query.slug } : { _id: req.query.id };

    if (!findCriteria)
      res.send(500);

    Post.findOne(findCriteria).populate('author').exec(function (err, post) {
      err ? res.send(500) : res.json(post);
    });
  });

}