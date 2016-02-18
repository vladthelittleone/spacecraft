'use strict';

var gulp = require('./gulp')([
    'packaging',
    'server',
    'watch',
    'bower',
    'images',
    'browserify',
	'move'
]);

gulp.task('build', ['packaging', 'bower', 'images', 'move']);
gulp.task('default', ['build', 'server', 'watch']);
