/**
 * Created by vladthelittleone on 18.02.16.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');

module.exports = function() {
	return gulp.src(['./public/javascripts/code/**', './public/lib/**'], { base: './public' })
		.pipe(gulp.dest('./build/'));
};
