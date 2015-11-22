var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

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
        .pipe(buffer()) // prepare to be minified
        .pipe(uglify()) // minify
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});
