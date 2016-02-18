/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

module.exports = function(){
    return gulp.src('./public/images/**', { base: './public' })
        .pipe(imagemin())
        .pipe(gulp.dest('./build/'));
};
