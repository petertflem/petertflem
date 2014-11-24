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
  var _this = this;
  
  generateUniqueSlug(slug(this.title)).then(function (uniqueSlug) {
    _this.slug = uniqueSlug;
    next();
  });
});

var tryCount = 1;
function generateUniqueSlug(slugToFind) {
  var query = Post.findOne({ slug: slugToFind });
  
  query.exec().then(function (found) {
    
    if (!found)
      return slugToFind;
    
    return generateUniqueSlug(slugToFind + tryCount++);
  });
}

module.exports = Post;