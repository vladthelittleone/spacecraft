/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var notify = require('gulp-notify');

module.exports = function ()
{
    gulp.watch([
            'client/views/*.html',
            'client/*.html',
            'client/resources/styles/*.css'
        ],
        ['packaging']);
};
