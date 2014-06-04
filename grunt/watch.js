/*
 * Watch task
 */

module.exports = {
    
    /*
     * All targets have live reload enabled
     */
    options: {
        livereload: true
    },
    
    /*
     * Watch all stylus files, compile them and reload on change
     */
    stylesheets: {
        files: 'app/**/*.styl',
        tasks: ['stylus:dev']
    },

    /*
     * Watch .jade files, and reload on change
     */
    jade: {
        files: '**/*.jade'
    }
}