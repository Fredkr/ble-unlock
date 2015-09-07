'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        path: {
            sass: 'client/sass',
            css: 'client/public/css',
            js: 'scanner',
            jsx: 'client/react_components'
        },
        express: {
            dev: {
                options: {
                    script: './server.js'
                }
            }
        },
        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ],
                browserifyOptions: {
                    paths: ['./client/react_components', './client/react_components/settings'],
                    fullPaths: false,
                    extensions: ['.jsx']
                }
            },
            client: {
                src: ['<%=path.jsx%>/**/*.jsx'],
                dest: 'client/public/js/app.js'
            }
        },
        watch: {
            react: {
                files: '<%=path.jsx%>/settings/*.jsx',
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: '<%=path.sass%>/*.scss',
                tasks: ['sass', 'autoprefixer']
            },
            express: {
                files:  [ '<%=path.jsx%>/settings/*.jsx' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false
                }
            }
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            target: ['server.js', 'gruntfile.js', '<%=path.jsx%>/**/*.jsx', '<%=path.js%>/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    '<%=path.css%>/style.css': '<%=path.sass%>/*.scss'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    '<%=path.css%>/style.css': '<%=path.css%>/style.css'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['eslint', 'sass', 'autoprefixer', 'browserify', 'express', 'watch:react']);
    grunt.registerTask('dev', ['eslint', 'browserify', 'watch:react', 'watch:css']);
};
