/**
 * Created by vladthelittleone on 27.11.15.
 */
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
    return gulp.src('client/resources/styles/*.css')
        .pipe(concatCss('styles/spacecraft.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss(''))
        .pipe(rename('styles/spacecraft.min.css'))
        .pipe(gulp.dest('out/'))
        .pipe(notify('Css minification task is done.'));
});

gulp.task('watch', function () {
    gulp.watch('client/resources/styles/*.css', ['default'])
});
