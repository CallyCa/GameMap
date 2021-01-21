module.exports = (grunt) => {
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach((task) => {
        grunt.loadNpmTasks(task);
    });
}