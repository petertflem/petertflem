exports.url = 'mongodb://localhost:27017/petertflem';

/* Just some code to add a user to the database if it doesnt exist */
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
User.findOne({'local.username': 'petertflem'}, function (err, user) {
  if (err)
    throw err;

  if (user) {
    console.log('User exists');
  } else {
    var newUser = new User();
    
    newUser._id = ObjectId('54749f768fea46fc91759c5e');
    newUser.local.username = 'petertflem';
    newUser.local.password = newUser.generateHash('1234');
    newUser.forename = 'Peter';
    newUser.surename = 'Tollnes Flem';
    newUser.image = '/blobs/54749f768fea46fc91759c5e/image.jpg'

    newUser.save(function (err) {
      if (err)
        throw err;

      console.log('User saved!');
    });
  }
});