module.exports = function (grunt) {

    // Configuration de Grunt
    grunt.initConfig({
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'client/css/', src: ['*.css'], dest: "www/client/css/"},
                    {expand: true, cwd: 'client/fonts/', src: ['**'], dest: "www/client/fonts/"},
                    {expand: true, cwd: 'client/img/', src: ['**'], dest: "www/client/img/"},
                    {expand: true, cwd: 'client/librairies/', src: ['**'], dest: "www/client/librairies/"},
                    {expand: true, cwd: 'client/svg/', src: ['**'], dest: "www/client/svg/"},
                    {expand: true, cwd: 'client/', src: ['index.html'], dest: "www/client/"},
                ]
            }
        },

        // Jasmine
        jasmine: {
            components: {
                src: [
                    "client/js/psr/**",
                ],
                options: {
                    vendor: [
                        'client/js/o876/o2.js',
                        'client/js/o876/Mixin/Events.js',
                        'client/js/moment.js',

                        'client/js/jquery.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                        'client/js/materialize.min.js',
                        'client/js/materializer.js',
                        'client/js/perfect-scrollbar.jquery.min.js'
                    ],
                    specs: 'tests/client/**/*Spec.js',
                    styles: [
                        'client/css/materialize.min.css',
                        'client/css/style.css'
                    ],
                    helpers: 'tests/spec/helper.js',
                    keepRunner: true
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: [
                    "client/js/psr/**/*Abstract.js",
                    "client/js/psr/**",
                ],
                // the location of the resulting JS file
                dest: 'www/client/js/psr.js',
            },
            dev: {
                src: [
                    "client/js/psr/**"
                ],
                dest: 'client/js/psr.js'
            }
        },
        // Uglify
        uglify: {
            options: {
                // Use these options when debugging
                // mangle: false,
                // compress: false,
                // beautify: true
            },
            dist: {
                files: {
                    'dist/js/psr.min.js': ['www/client/js/psr.min.js']
                }
            }
        },

        // Concurrent
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: ["watch:dev"]
            },
            "monitor-server": {
                tasks: ["watch:dev-server"]
            }
        },

        // Watch Files
        watch: {
            dev: {
                files: [
                    "client/js/psr/**",
                    "tests/client/**"
                ],
                tasks: ['dev', 'tests'],
                options: {
                    interrupt: false,
                    spawn: false
                },
            },
            'dev-server': {
                files: [
                    "client/css/**.css",
                    "client/js/psr/**"
                ],
                tasks: ['dev-server'],
                options: {
                    interrupt: false,
                    spawn: false
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concurrent');

    // Définition des tâches Grunt pour une sortie de release
    grunt.registerTask(
        'release',
        [
            'copy:dist',
            'concat:dist',
            'uglify:dist'
        ]
    );
    // Concat la dev
    grunt.registerTask('dev', ['concat:dev']);
    grunt.registerTask('dev-server',
        [
            'copy:dist',
            'concat:dist'
        ]
    );
    // Monitor pour la dev
    grunt.registerTask('monitor', ["concurrent:monitor"]);
    grunt.registerTask('tests', ['jasmine']);
    grunt.registerTask('monitor-server', ["concurrent:monitor-server"]);

}