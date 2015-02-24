module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                node: true,
                globals: {
                    /* MOCHA */
                    "define": false,
                    "describe": false,
                    "it": false,
                    "before": false,
                    "beforeEach": false,
                    "after": false,
                    "afterEach": false
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['src/**/*.js', 'tests/**/*.js', 'index.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'intern']
            }
        },
        intern: {
            unit_testing: {
                options: {
                    config: 'tests/intern',
                    suites: ['tests/unit/all'],
                    reporters: ['console', 'lcovhtml', 'cobertura']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['test']);
//    grunt.registerTask('test', ['jshint', 'intern']);
    grunt.registerTask('test', ['intern']);
    grunt.registerTask('testing', ['test', 'watch']);

};
