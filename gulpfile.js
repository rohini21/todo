var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var runSequence = require('gulp-run-seq');
var browserify  = require('browserify');

var gulpLoadPlugins = require('gulp-load-plugins')();   


gulp.task('browserify',function() {
  return browserify({
    entries: ['./js/index.js']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpLoadPlugins.uglify())
  .pipe(gulpLoadPlugins.addSrc('./index.html'))
  .pipe(gulpLoadPlugins.addSrc('./font/**'))
  .pipe(gulp.dest('./build/client'));
});

gulp.task('copy-fonts', function(){
	return gulp.src('./font/**')
	.pipe(gulp.dest('./build/client/font'))
});

gulp.task('default',['browserify','copy-fonts'],function(){
  return gulp.src('./build/**')
  .pipe(gulpLoadPlugins.zip('build.zip'))
  .pipe(gulp.dest('./dist'))
})

