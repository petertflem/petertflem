var User = require('../models/user');
var Auth = require('../middleware/authentication');
var ObjectId = require('mongoose').Types.ObjectId;
var Busboy = require('busboy');
var fs = require('fs');
var rimraf = require('rimraf');

module.exports = function (app, passport) {

  /*
   * POST: /user/login
   */
  app.post('/user/login', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/user/login'
  }));

  /*
     * GET: /user/logout
     */
  app.get('/user/logout', Auth.auth, function(req, res) {
    req.logout();
    res.send(200);
  });

  /*
   * GET: /posts/find-one?id=...
   */
  app.get('/user/find-one', function (req, res) {
    User.findOne({ '_id': ObjectId(req.query.id) }, function (err, post) {
      err ? res.send(500) : res.json(post);
    });
  });
  
  app.post('/user/delete', Auth.auth, function (req, res) {
    var userId = req.body.userId;
    
    if (!userId)
      return res.send(500);
    
    // Delete user specific blobs
    rimraf('app/assets/blobs/' + userId, function(err) {
      // Will not produce errors if it can't find folder
      if (err)
        return res.send(500);
      
      // Delete user from database
      User.remove({ _id: userId }, function (err) {
        if (err)
          return res.send(500);

        res.send(200);
      });
    });
  });

  /*
   * POST: /user/create
   */
  app.post('/user/create', Auth.auth, function (req, res) {
    parseFormData(req, res, function (formData) {
      var user = new User();
      
      user.local.username = formData.fields.username;
      user.local.password = formData.fields.password;
      user.forename = formData.fields.forename;
      user.surename = formData.fields.surename;
      
      // We have to do this, else the upsert will fail
      var obj = user.toObject();
      delete obj._id;
      
      User.update({ _id: req.body._id || ObjectId() }, obj, { upsert: true }, function (err, numberAffected, raw) {
        if (err)
          return res.send(500);
        
        // Now we have the users id, if there is an image, save it
        if (!formData.files.image)
          return res.send(200);
        
        var userId = raw.upserted[0]._id;
        var saveDir = 'app/assets/blobs/' + userId + '/';
        
        // Make sure the user directory exists
        if (!fs.exists(saveDir)) {
          fs.mkdir(saveDir, function(error) {
            console.log(error);
          });
        }
        
        // Save the file
        fs.writeFile(saveDir + formData.files.image.filename, formData.files.image.data, function (err) {
          if (err)
            return res.send(500);
          
          // Add the saved image to the user
          user.image = '/blobs/' + userId + '/' + formData.files.image.filename;
          
          // We have to do this, else the upsert will fail
          var obj = user.toObject();
          delete obj._id;
          
          // Save the image on the user
          User.update({ _id: userId }, obj, { upsert: true }, function (err, numberAffected, raw) {
            if (err)
              return res.send(500);
            
            res.send(200);
          });
        });
        
      });
    });
  });
  
  /* Helper functions */
  function parseFormData(req, res, callback) {
    var busboy = new Busboy({ headers: req.headers });
    var buffers = {};
    var formData = {
      files: {},
      fields: {}
    };
    
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      file.on('data', function(data) {
        if (!buffers[fieldname])
          buffers[fieldname] = [];
        
        buffers[fieldname].push(data);
      });
      file.on('end', function() {
        // If we have a file, save it in a object
        if (filename) {
          formData.files[fieldname] = { 
            filename: filename,
            data: Buffer.concat(buffers[fieldname])
          };
        }
      });
    });
    
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
      formData.fields[fieldname] = val;
    });
    
    busboy.on('finish', function() {
      callback(formData);
    });
    
    req.pipe(busboy);
  }
}