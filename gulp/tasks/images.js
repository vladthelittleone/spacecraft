/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

module.exports = function(){
    return gulp.src('./client/resources/assets/**', { base: './client' })
        .pipe(imagemin())
        .pipe(gulp.dest('./build/'));
};
