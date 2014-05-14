var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

module.exports = function (app, passport) {
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(expressSession({secret: 'wakkawakkadumbledore!'}));
    app.use(passport.initialize());
    app.use(passport.session());
}