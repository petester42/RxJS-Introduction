module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                presets: ['es2015']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: 'src/*.es6',
                        ext: '.js'
                    }
                ]
            }
        },
        livereloadx: {
            static: true,
            dir: 'src'
        },
        watch: {
            babel: {
                files: ['src/*.es6'],
                tasks: ['babel']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('livereloadx');

    grunt.registerTask('default', ['livereloadx', 'babel', 'watch']);
};
