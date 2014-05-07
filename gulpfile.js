'use strict';

var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  less = require('gulp-less'),
  usemin = require('gulp-usemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin'),
  cssmin = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  rm = require('gulp-rimraf'),
  glob = require('glob'),
  hint = require('gulp-jshint');

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

gulp.task('browserify', ['hint'], function() {
  return browserify('./app/index.js')
    .bundle({
      debug: true
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('browserify.tests', function() {
  var testFiles = glob.sync('./app/modules/**/*Spec.js');
  return browserify(testFiles).bundle({
    debug: true
  })
    .pipe(source('bundle-tests.js'))
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
    '.tmp/bundle.js',
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
  gulp.watch('app/modules/**/*.js', ['hint', 'browserify', 'browserify.tests']);
});

gulp.task('test', ['hint']);
gulp.task('server', [
  'less',
  'hint',
  'browserify',
  'browserify.tests',
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