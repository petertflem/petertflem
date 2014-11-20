var mongoose = require('mongoose');

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

module.exports = mongoose.model('Post', postSchema);