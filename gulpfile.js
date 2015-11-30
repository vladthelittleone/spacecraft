'use strict';

var gulp = require('./gulp')([
    'packaging',
    'server',
    'watch',
    'bower',
    'images'
]);

gulp.task('build', ['packaging', 'bower', 'images']);
gulp.task('default', ['build', 'server', 'watch']);
