var Post = require('../models/post');

module.exports = function (app) {

  /*
   * GET: /posts.json
   * Query string parameters: limit=...
   */
  app.get('/posts.json', function (req, res) {
    var limit = parseInt(req.query.limit);
    var query = Post.find({}).sort('-date').populate('author');
    
    if (limit)
      query = query.limit(limit);
      
    query.exec(function (err, posts) {
      err ? res.send(500) : res.json(posts);
    });
  });

}