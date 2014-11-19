var User = require('../models/user');
var Auth = require('../middleware/authentication');
var ObjectId = require('mongoose').Types.ObjectId;

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
    
    /*
     * POST: /user/create
     */
    app.post('/user/create', Auth.auth, function (req, res) {
        var user = new User();
        user.local.username = req.body.username;
        user.local.password = user.generateHash(req.body.password);
        user.forename = req.body.forename;
        user.surename = req.body.surename;

        // We have to do this, else the upsert will fail
        var obj = user.toObject();
        delete obj._id;

        User.update({ _id: req.body._id || ObjectId() }, obj, { upsert: true }, function (err, numberAffected, raw) {
            err && res.send(500);

            console.log('User saved!');
            res.send(200);
        });
    });
}