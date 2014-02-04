'use strict';

var gulp = require('gulp'),
  tinylr = require('tiny-lr'),
  server = tinylr(),
  livereload = require('gulp-livereload'),
  less = require('gulp-less'),
  usemin = require('gulp-usemin'),
  connect = require('gulp-connect'),
  // karma = require('gulp-karma'),
  hint = require('gulp-jshint');

gulp.task('less', function() {
  gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
});

gulp.task('hint', function() {
  gulp.src(['app/js/**/*.js', '*.js'])
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('connect', connect({
  root: __dirname + '/app',
  livereload: true,
  port: 8888
}));

gulp.task('livereload', function() {
  gulp.src([
    'app/js/**/*.js',
    'app/css/*.css',
    'app/views/**/*.html',
    'app/index.html'
  ])
    .pipe(livereload(server));
});

gulp.task('karma', function() {
  // gulp.src('test/unit/**/*.js')
  //   .pipe(karma({
  //     configFile: 'test/karma.conf.js'
  //   }));
});

gulp.task('usemin', function() {
  gulp.src('app/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  server.listen(35729);
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['hint', 'livereload']);
  gulp.watch(['app/views/**/*.html', 'app/index.html'], ['livereload']);
});

gulp.task('test', ['hint', 'karma']);
gulp.task('server', ['less', 'hint', 'watch', 'connect']);
gulp.task('build', ['test', 'less', 'usemin']);
gulp.task('default', ['server']);