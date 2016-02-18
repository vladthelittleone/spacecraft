/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var bower = require('gulp-bower');

module.exports = function() {
    return bower({ directory: './bower_components', cwd: './public' })
        .pipe(gulp.dest('./build/bower_components'))
};
