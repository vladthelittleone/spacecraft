/**
 * Created by vladthelittleone on 30.11.15.
 */
var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function() {
    return browserify('client/scripts/app.js')
        .bundle()
        // Передаем имя файла, который получим на выходе, vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
};
