'use strict';

var gulp = require('gulp');
var ghelp = require('gulp-showhelp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
require('./index.js');


var srcs = [
  'src/engine.js',
  'src/ender.js',
  'src/taskext.js',
];


gulp.task('help', function() {
  ghelp.show();
}).help = 'shows this help message.';

gulp.task('lint', function() {
  gulp.src(srcs)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('.'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}).help = "generates the none-minifized 'index.js' and lints it. ";

gulp.task('uglify', function() {
  gulp.src(srcs)
    .pipe(uglify())
    .pipe(concat('index.js', {newLine:''}))
    .pipe(gulp.dest('.'));
}).help = "minifizes source files and concatinates them into the 'index.js'.";

