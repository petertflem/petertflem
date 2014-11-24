var mongoose = require('mongoose');
var slug = require('slug');

var postSchema = mongoose.Schema({
  title: String,
  slug: String,
  author: {
    name: String,
    id: String
  },
  body: String,
  comments: [{ author: String, body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema);


postSchema.pre('save', function (next) {
  var count = 0;
  var _this = this;
  var currentSlug = slug(this.title);
  generateUniqueSlug();
  
  
  function generateUniqueSlug() {
    Post.findOne({ slug : currentSlug }, function (err, post) {
      if (post) {
        currentSlug += ++count;
        generateUniqueSlug();
      }
      
      _this.slug = currentSlug;
      next();
    });
  }
});

module.exports = Post;