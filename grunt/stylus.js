/*
 * Stylus task
 */

var fs = require('fs');

module.exports = {

    /*
     * Set up the compilation of stylus files for development
     */
    dev: {
        files: {
            'app/assets/stylesheets/css/main.css': getStylusStylesheetPaths()
        }
    }
}

function getStylusStylesheetPaths() {
    var files = fs.readdirSync('app/assets/stylesheets/stylus');
    var stylesheets = [];
    
    files.forEach(function (file) {
        stylesheets.push('./app/assets/stylesheets/stylus/' + file);
    });
    
    return stylesheets;
}