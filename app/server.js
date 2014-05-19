/* Vendor modules */
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

// Initialize the app
var app = express();

// Connect to the database
mongoose.connect(require('./config/database').url);

// Run config
require('./config/middleware')(app, passport);
require('./config/passport')(passport);

// Set view directory and engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/areas');

// Initialize the routes
require('./lib/routes').initialize(app, passport, express);

// Start the server
var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});