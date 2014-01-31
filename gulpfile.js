var gulp = require('gulp'),
  tinylr = require('tiny-lr'),
  server = tinylr(),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  karma = require('gulp-karma'),
  hint = require('gulp-jshint'),
  concat = require('gulp-concat');

gulp.task('less', function() {
  gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(livereload(server));
});

gulp.task('hint', function() {
  gulp.src('app/js/**/*.js')
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('test:unit', function() {
  gulp.src('test/unit/**/*.js')
    .pipe(karma({
      configFile: 'test/karma.conf.js'
    }));
})

gulp.task('assemble', function() {
  gulp.src('app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('test', ['hint', 'karma']);
gulp.task('build', ['test', 'less', 'assemble']);

gulp.task('watch', function() {
  server.listen(35729);
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['hint']);
});

gulp.task('default', ['watch']);