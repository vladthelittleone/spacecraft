/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');

module.exports = function ()
{
    gulp.watch([
            'public/views/*.html',
            'public/*.html',
            'public/resources/styles/*.css'
        ],
        ['packaging']);
};
