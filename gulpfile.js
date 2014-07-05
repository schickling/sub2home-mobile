'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var hint = require('gulp-jshint');
var header = require('gulp-header');

gulp.task('less', function() {
  return gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/css'));
});

gulp.task('hint', function() {
  return gulp.src(['app/modules/**/*.js', '*.js'])
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('browserify.app', function() {
  return browserify('./app/index.js')
    .external('lodash')
    .external('fastclick')
    .external('zipcoder')
    .external('angular/angular')
    .external('angular-route/angular-route')
    .external('angular-touch/angular-touch')
    .external('angular-resource/angular-resource')
    .external('angular-local-storage/angular-local-storage')
    .external('angular-bindonce/bindonce')
    .external('./modules/template-cache')
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
    .require('fastclick')
    .require('zipcoder')
    .require('angular/angular')
    .require('angular-route/angular-route')
    .require('angular-touch/angular-touch')
    .require('angular-resource/angular-resource')
    .require('angular-local-storage/angular-local-storage')
    .require('angular-bindonce/bindonce')
    .bundle()
    .pipe(source('libs.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('browserify.templates', ['views'], function() {
  return browserify()
    .require('./.tmp/templates', {
      expose: './modules/template-cache'
    })
    .bundle()
    .pipe(source('template-cache.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('webserver', function() {
  return gulp.src(['.tmp', 'app'])
    .pipe(webserver({
      livereload: true
    }));
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
  'browserify',
  'hint'
]);

gulp.task('browserify', [
  'browserify.libs',
  'browserify.templates',
  'browserify.app',
]);

gulp.task('server', [
  'less',
  'hint',
  'browserify',
  'watch',
  'webserver',
]);

gulp.task('default', ['server']);
