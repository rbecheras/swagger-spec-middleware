module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            coverage: ["html-report", 'cobertura-coverage.xml']
        },
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
                src: ['src/**/*.js', 'test/**/*.js', 'index.js']
            },
            unit_test: {
                src: ['src/**/*.js', 'test/unit/**/*.js', 'index.js']
            },
            functional_test: {
                src: ['src/**/*.js', 'test/functional/**/*.js', 'index.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile', 'test']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['test']
            },
            unit_test: {
                files: '<%= jshint.unit_test.src %>',
                tasks: ['test-unit']
            },
            functional_test: {
                files: '<%= jshint.functional_test.src %>',
                tasks: ['test-functional']
            }
        },
        intern: {
            unit: {
                options: {
                    config: 'test/intern',
                    suites: ['test/unit/all'],
                    reporters: ['console', 'lcovhtml', 'cobertura']
                }
            },
            integration: {
                options: {
                    config: 'test/intern',
                    suites: ['test/integration/all']
                    //reporters: ['console', 'lcovhtml', 'cobertura']
                }
            },
            functional: {
                options: {
                    config: 'test/intern',
                    suites: ['test/functional/all']
                    //reporters: ['console']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['test']);
    grunt.registerTask('test', ['clean:coverage', 'intern']);
    grunt.registerTask('testing', ['test', 'watch']);
    
    grunt.registerTask('test-unit', ['clean:coverage', 'intern:unit']);
    grunt.registerTask('testing-unit', ['test-unit', 'watch:unit_test']);

    grunt.registerTask('test-functional', ['clean:coverage', 'intern:functional']);
    grunt.registerTask('testing-functional', ['test-functional', 'watch:functional_test']);
};
