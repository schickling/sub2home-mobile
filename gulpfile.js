'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var webserver = require('gulp-webserver');
var hint = require('gulp-jshint');
var header = require('gulp-header');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');

gulp.task('clean', function(cb) {
  rimraf('./dist', cb);
});

gulp.task('less', function() {
  return gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('app/.tmp/css'));
});

gulp.task('hint', function() {
  return gulp.src(['app/modules/**/*.js', '*.js'])
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('browserify.app', function() {
  return browserify('./app/index.js')
    .external('bowser')
    .external('lodash')
    .external('fastclick')
    .external('zipcoder')
    .external('angular/angular')
    .external('angular-route/angular-route')
    .external('angular-touch/angular-touch')
    .external('angular-resource/angular-resource')
    .external('angular-local-storage/angular-local-storage')
    .external('angular-bindonce')
    .external('./modules/template-cache')
    .bundle({
      debug: true,
      standalone: 'app',
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('app/.tmp/js'));
});

gulp.task('browserify.libs', function() {
  return browserify()
    .require('bowser')
    .require('lodash')
    .require('fastclick')
    .require('zipcoder')
    .require('angular/angular')
    .require('angular-route/angular-route')
    .require('angular-touch/angular-touch')
    .require('angular-resource/angular-resource')
    .require('angular-local-storage/angular-local-storage')
    .require('angular-bindonce')
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('app/.tmp/js'));
});

gulp.task('browserify.templates', ['views'], function() {
  return browserify()
    .require('./.tmp/templates', {
      expose: './modules/template-cache'
    })
    .bundle()
    .pipe(source('template-cache.js'))
    .pipe(gulp.dest('app/.tmp/js'));
});

gulp.task('webserver', function() {
  return gulp.src(['app'])
    .pipe(webserver({
      port: 8080,
      host: '0.0.0.0',
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('minify', ['clean', 'browserify', 'less'], function() {
  return gulp.src('app/index.html')
    .pipe(usemin({
      css: [minifyCss(), rev()],
      html: [minifyHtml({
        empty: true
      })],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy.fonts', ['clean'], function() {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy.images', ['clean'], function() {
  return gulp.src('app/images/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('views', function() {
  return gulp.src('app/modules/**/*.html')
    .pipe(templateCache('templates.js', {
      module: 'template-cache',
      standalone: true,
      root: 'modules',
    }))
    .pipe(header('module.exports = '))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('watch', function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/modules/**/*.html', ['browserify.templates']);
  gulp.watch(['app/index.js', 'app/modules/**/*.js'], ['browserify.app']);
});

gulp.task('test', [
  'hint',
  'browserify'
]);

gulp.task('browserify', [
  'browserify.libs',
  'browserify.templates',
  'browserify.app',
]);

gulp.task('server', [
  'less',
  //'hint',
  'browserify',
  'watch',
  'webserver',
]);

gulp.task('build', [
  'clean',
  'test',
  'minify',
  'copy.fonts',
  'copy.images',
]);

gulp.task('default', ['server']);
