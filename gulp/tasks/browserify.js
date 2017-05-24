/**
 * Created by vladthelittleone on 30.11.15.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');


const options = {

	entries: 'public/javascripts/app.js',
	transform: [babelify.configure({
		presets: ['es2015']
	})]

};

module.exports = function() {

    return browserify(options)
        .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/javascripts'));
	
};
