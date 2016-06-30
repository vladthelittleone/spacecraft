'use strict';

var gulp = require('./gulp')([
    'packaging',
    'server',
    'watch',
    'bower',
    'images',
    'browserify',
	'move',
	'rev'
]);

gulp.task('build', ['browserify', 'packaging', 'bower', 'images', 'move', 'rev']);
gulp.task('default', ['build', 'server', 'watch']);
