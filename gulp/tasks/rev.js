/**
 * Created by vladthelittleone on 19.02.16.
 */
var gulp = require('gulp');
var revCollector = require('gulp-rev-collector');

module.exports = function()
{
	return gulp.src(['./build/*.json', './build/index.html'])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest('build'));
};
