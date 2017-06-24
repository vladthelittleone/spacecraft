/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var babel  = require('gulp-babel');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rev = require('gulp-rev');

module.exports = function ()
{
    return gulp.src(['./public/index.html', './public/views/**/*.html'], {base: './public'})      
 .pipe(useref())
        .pipe(gulpif('javascripts/bundle.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer('last 2 versions')))
        .pipe(gulpif('*.css', minifyCss()))
		.pipe(gulpif('*.css', rev()))
		.pipe(gulpif('*.js', rev()))
		.pipe(livereload())
		.pipe(gulp.dest('build'))
		.pipe(rev.manifest())
        .pipe(gulp.dest('build'));
};
