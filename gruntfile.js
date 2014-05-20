var fs = require('fs');

module.exports = function (grunt) {
    
    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.initConfig({
        
        less: {
            dev: {
				files: {
					'app/assets/stylesheets/css/bootstrap.css': 'bower_components/bootstrap/less/bootstrap.less'
				}
			}
        },
        
        stylus: {
            dev: {
				files: {
					'app/assets/stylesheets/css/main.css': getStylusStylesheetPaths()
				}
			}
        },
        
        concat: {
            css: {
                files: {
                    'app/assets/stylesheets/css/main.css': 'app/assets/stylesheets/css/*.css'
                }
            },
            
            js: {
                options: {
                  separator: ';',
                },
                files: {
                    'app/assets/javascript/main.js': ['bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'app/assets/javascript/app.js']
                }
            }
        },
        
        clean: {
            build_css: {
                src: ['app/assets/stylesheets/css/bootstrap.css']
            }
        },
        
        delta: {
			options: {
				livereload: true
			},

			stylesheets: {
				files: ['app/**/*.styl', 'bower_components/bootstrap/less/*.less'],
				tasks: ['less:dev', 'stylus:dev', 'concat:css', 'clean:build_css']
			},
            
            js: {
                files: ['app/assets/javascript/*.js'],
                tasks: ['concat:js']
            },
            
			jade: {
				files: '**/*.jade'
			}
		}
    });
    
    grunt.renameTask('watch', 'delta');
    
    grunt.registerTask('watch', ['delta']);
}

function getStylusStylesheetPaths() {
    var files = fs.readdirSync('app/assets/stylesheets/stylus');
    var stylesheets = [];
    
    files.forEach(function (file) {
        stylesheets.push('./app/assets/stylesheets/stylus/' + file);
    });
    
    return stylesheets;
}