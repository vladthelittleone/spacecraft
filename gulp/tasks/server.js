/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');

module.exports = function ()
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
            .pipe(notify('[server] Reloading page, please wait...'));
    })
};
