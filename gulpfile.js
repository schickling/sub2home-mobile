'use strict';

var gulp = require('gulp'),
  less = require('gulp-less'),
  usemin = require('gulp-usemin'),
  connect = require('gulp-connect'),
  clean = require('gulp-clean'),
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

gulp.task('connect', connect.server({
  root: __dirname + '/app',
  livereload: true,
  port: 8888
}));

gulp.task('karma', function() {
  // gulp.src('test/unit/**/*.js')
  //   .pipe(karma({
  //     configFile: 'test/karma.conf.js'
  //   }));
});

gulp.task('clean:dist', function() {
  gulp.src('dist', {
    read: false
  })
    .pipe(clean());
});

gulp.task('usemin', function() {
  gulp.src('app/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  // server.listen(35729);
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['hint']);
  gulp.watch([
    'app/views/**/*.html',
    'app/js/**/*.js',
    'app/css/*.css',
    'app/index.html'
  ], connect.reload);
});

gulp.task('test', ['hint', 'karma']);
gulp.task('server', ['less', 'hint', 'watch', 'connect']);
gulp.task('build', ['test', 'less', 'clean:dist', 'usemin']);
gulp.task('default', ['server']);