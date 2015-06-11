module.exports = function(grunt) {
    grunt.initConfig({
        
        sass: {
            dist: {
                files: {
                    'client/public/css/style.css': 'client/sass/style.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer']
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'client/public/css/style.css':'client/public/css/style.css'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.registerTask('default', ['sass','autoprefixer']);

};