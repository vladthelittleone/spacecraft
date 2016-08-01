/**
 * @since 18.02.16
 * @author Skurishin Vladislav
 */
var gulp = require('gulp');
var rev = require('gulp-rev');

module.exports = function () {

	return gulp.src(['./public/javascripts/code/**',
			'./public/lib/**',
			'./public/favicon.ico',
			'./public/audio/**'], {base: './public'})
		.pipe(gulp.dest('./build/'));

};
