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
            test: {
                src: ['src/**/*.js', 'test/**/*.js', 'index.js']
            },
            unit_test: {
                src: ['src/**/*.js', 'test/unit/**/*.js', 'index.js']
            },
            functional_test: {
                src: ['src/**/*.js', 'test/functional/**/*.js', 'index.js']
            },
            integration_test: {
                src: ['src/**/*.js', 'test/integration/**/*.js', 'index.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile', 'test']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['test']
            },
            unit_test: {
                files: '<%= jshint.unit_test.src %>',
                tasks: ['test-unit']
            },
            functional_test: {
                files: '<%= jshint.functional_test.src %>',
                tasks: ['test-functional']
            },
            integration_test: {
                files: '<%= jshint.integration_test.src %>',
                tasks: ['test-integration']
            }
        },
        intern: {
            options: {
                config: 'test/intern',
                reporters: ['console', 'lcovhtml', 'cobertura'],
                grep: grunt.option('grep') ? grunt.option('grep') : '.*'
            },
            all: {
                options: {
                    suites: [
                        'test/unit/all',
                        'test/functional/all',
                        'test/integration/all'
                    ]
                }
            },
            unit: {
                options: {
                    suites: ['test/unit/all']
                }
            },
            functional: {
                options: {
                    suites: ['test/functional/all']
                }
            },
            integration: {
                options: {
                    suites: ['test/integration/all']
                }
            }
        }
    });

    grunt.loadNpmTasks('intern');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['test']);

    grunt.registerTask('test', ['clean:coverage', 'intern:all']);
    grunt.registerTask('test-unit', ['clean:coverage', 'intern:unit']);
    grunt.registerTask('test-functional', ['clean:coverage', 'intern:functional']);
    grunt.registerTask('test-integration', ['clean:coverage', 'intern:integration']);

    grunt.registerTask('testing', ['test', 'watch:test']);
    grunt.registerTask('testing-unit', ['test-unit', 'watch:unit_test']);
    grunt.registerTask('testing-functional', ['test-functional', 'watch:functional_test']);
    grunt.registerTask('testing-integration', ['test-integration', 'watch:integration_test']);
};
