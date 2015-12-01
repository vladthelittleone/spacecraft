/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function ()
{
    return gulp.src(['./client/index.html', './client/views/*.html'], {base: './client'})
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer('last 2 versions')))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(livereload())
        .pipe(gulp.dest('build'));
};
