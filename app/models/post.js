var mongoose = require('mongoose');
var slug = require('slug');
var Schema = mongoose.Schema;

var postSchema = mongoose.Schema({
  title: String,
  slug: {
		type: String,
		unique: true
	},
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  body: String,
  comments: [{ author: String, body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema);

postSchema.pre('save', function (next) {
  var _this = this;
  
  generateUniqueSlug(slug(this.title.toLowerCase()), 0).then(function (uniqueSlug) {
    _this.slug = uniqueSlug;
    next();
  });
});

function generateUniqueSlug(slugToFind, tryCount) {
	var slugToTry = tryCount === 0 ? slugToFind : slugToFind + tryCount;
  
  return Post.findOne({ slug: slugToTry }).exec().then(function (found) {
    if (!found)
      return slugToTry;
    
    return generateUniqueSlug(slugToFind, ++tryCount);
  });
}

module.exports = Post;