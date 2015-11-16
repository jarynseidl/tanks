var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('watch', function () {
    watch('./static/js/src/*.js', 
        batch(function (events, done) {
            gulp.start('browserify', done);
        }));
});
 
gulp.task('browserify', function() {
    return browserify('./static/js/src/app.js', {"transform": ["reactify"]})
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('./static/js/app.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});
