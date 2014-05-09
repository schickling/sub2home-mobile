'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var rm = require('gulp-rimraf');
var glob = require('glob');
var hint = require('gulp-jshint');

gulp.task('less', function() {
  return gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
});

gulp.task('hint', function() {
  return gulp.src(['app/modules/**/*.js', '*.js'])
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('browserify', function() {
  return browserify('./app/index.js')
    .external('lodash')
    .external('angular/angular')
    .external('angular-route/angular-route')
    .external('angular-touch/angular-touch')
    .external('angular-local-storage/angular-local-storage')
    .bundle({
      debug: true,
      standalone: 'app',
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('browserify.libs', function() {
  return browserify()
    .require('lodash')
    .require('angular/angular')
    .require('angular-route/angular-route')
    .require('angular-touch/angular-touch')
    .require('angular-local-storage/angular-local-storage')
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('connect', function() {
  return connect.server({
    root: ['.tmp', 'app'],
    livereload: true,
  });
});

gulp.task('livereload', function() {
  gulp.src([
    'app/modules/**/*.html',
    '.tmp/*.js',
    'app/css/*.css',
    'app/index.html'
  ])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('clean:dist', function() {
  return gulp.src('dist/*', {
    read: false
  })
    .pipe(rm());
});

gulp.task('views', function() {
  return gulp.src('app/views/**/*.html')
    .pipe(templateCache({
      module: 'mobile',
      root: 'views'
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('usemin', ['clean:dist', 'less'], function() {
  return gulp.src('app/index.html')
    .pipe(usemin({
      cssmin: cssmin(),
      htmlmin: htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      }),
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['usemin', 'views'], function() {
  return gulp.src(['dist/js/main.js', '.tmp/templates.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/modules/**/*.js', ['browserify']);
  gulp.watch('package.json', ['browserify.libs']);
});

gulp.task('test', ['hint']);
gulp.task('server', [
  'less',
  'hint',
  'browserify',
  'browserify.libs',
  'watch',
  'connect',
  'livereload'
]);
gulp.task('build', [
  'test',
  'clean:dist',
  'less',
  'usemin',
  'views',
  'compress'
]);
gulp.task('default', ['server']);