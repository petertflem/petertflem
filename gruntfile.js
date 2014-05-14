module.exports = function (grunt) {
    
    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
    
    grunt.initConfig({
        stylus: {
            dev: {
				files: {
					'app/areas/shared/main.css': 'app/areas/shared/main.styl'
				}
			},
			build: {
				options: {
					cleancss: true
				},
				files: {
					'build/css/main.css': 'less/main.less'
				}
			}
        },
        
        delta: {
			options: {
				livereload: true
			},

			stylus: {
				files: 'app/**/*.styl',
				tasks: ['stylus:dev']
			},

			jade: {
				files: '**/*.jade'
			}
		}
    });
    
    grunt.renameTask('watch', 'delta');
    
    grunt.registerTask('watch', ['delta']);
}