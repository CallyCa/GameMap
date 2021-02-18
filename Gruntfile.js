module.exports = (grunt) => {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach((task) => {
        grunt.loadNpmTasks(task);
    });

    // configure plugins

    grunt.initConfig({
        cafeMocha: {
            all: {src: 'qa/tests-*.js', options: { ui: 'tdd'},}
        },
        jshint: {
            qa: ['Gruntfile.js', 'src/qa/**/*.js'],
        },
        exec: {
            linkchecker: { cmd: 'linkchecker http://localhost:3000'}
        },
    });

    // register tasks

    grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
}