var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {
    
    /* SESSION SETUP */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    /* LOCAL LOGIN */
    passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        User.findOne({ 'local.username': username }, function (err, user) {
            console.log('Authenticating');
            console.log(err);
            
            if (err)
                done(err);
            
            if (!user) {
                console.log('Invalid username');
                return done(null, false);   
            }
            
            return done(null, user);
        })
    }));
}