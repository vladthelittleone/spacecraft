'use strict';

// Dependencies
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

// Task
gulp.task('server', function ()
{
    // listen for changes
    livereload.listen();

    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'server/bin/www',
        ext: 'js'
    }).on('restart', function()
    {
        // when the app has restarted, run livereload.
        gulp.src('server/bin/www')
            .pipe(livereload())
            .pipe(notify('Reloading page, please wait...'));
    })
});

gulp.task('css', function ()
{
    return gulp.src('client/resources/styles/*.css')
        .pipe(concatCss('styles/spacecraft.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss(''))
        .pipe(rename('styles/spacecraft.min.css'))
        .pipe(gulp.dest('out/'))
        .pipe(livereload())
        .pipe(notify('Css minification task is done.'));
});

gulp.task('scss', function ()
{
    return gulp.src('client/resources/styles/main.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss(''))
        .pipe(rename('styles/spacecraft.min.css'))
        .pipe(gulp.dest('out/'))
        .pipe(livereload())
        .pipe(notify('Scss minification task is done.'));
});

gulp.task('views', function ()
{
    return gulp.src('client/views/*.html')
        .pipe(gulp.dest('out/views'))
        .pipe(notify('Html reload is done.'));
});

gulp.task('watch', function ()
{
    gulp.watch([
            'client/views/*.html',
            'client/*.html',
            'client/resources/styles/*.css'
        ],
        ['views', 'refresh']);
});

gulp.task('refresh', function ()
{
    return gulp.src('client/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', uncss({ html: ['client/views/*.html', 'client/index.html']})))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(livereload())
        .pipe(gulp.dest('out'))
        .pipe(notify('Refresh is done.'));
});

gulp.task('development', ['views', 'refresh', 'server', 'watch']);
