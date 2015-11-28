/**
 * Created by vladthelittleone on 27.11.15.
 */

// Dependencies
var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

// Task
gulp.task('server', function()
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

gulp.task('html', function ()
{
    return gulp.src('client/views/*.html')
        .pipe(gulp.dest('out/'))
        .pipe(livereload())
        .pipe(notify('Html reload is done.'));
});

gulp.task('watch', function ()
{
    gulp.watch('client/resources/styles/*.css', ['css']);
    gulp.watch('client/views/*.html', ['html']);
});

gulp.task('development', ['server', 'watch']);
