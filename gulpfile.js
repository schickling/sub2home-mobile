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
  // karma = require('gulp-karma'),
  hint = require('gulp-jshint');

gulp.task('less', function() {
  return gulp.src('app/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
});

gulp.task('hint', function() {
  return gulp.src(['app/js/**/*.js', '*.js'])
    .pipe(hint('.jshintrc'))
    .pipe(hint.reporter('default'));
});

gulp.task('browserify', ['hint'], function() {
  return browserify('./app/js/app.js')
    .bundle({
      debug: true
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/js'));
});

gulp.task('connect', function() {
  return connect.server({
    root: ['.tmp', 'app'],
    livereload: true,
  });
});

gulp.task('livereload', function() {
  gulp.src([
    'app/views/**/*.html',
    'app/js/**/*.js',
    'app/css/*.css',
    'app/index.html'
  ])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('karma', function() {
  // return gulp.src('test/unit/**/*.js')
  //   .pipe(karma({
  //     configFile: 'test/karma.conf.js'
  //   }));
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
  gulp.watch('app/less/*.less', ['less']);
  gulp.watch('app/js/**/*.js', ['hint', 'browserify']);
});

gulp.task('test', ['hint', 'karma']);
gulp.task('server', [
  'less',
  'hint',
  'browserify',
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