var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var replace = require('gulp-replace');
var bower = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var runSeq = require('run-sequence');

gulp.task('bower', function() {
  var jsFilter = filter('**/*.js', { restore: true });
  var cssFilter = filter('**/*.css');

  return gulp.src(bower())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('concat', function() {
  gulp.src(['lib/**/app.js', 'lib/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function() {
  gulp.src('lib/scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', function() {
  livereload.listen();

  gulp.watch(['lib/**/*', 'public/index.html', 'lib/templates/**'], function() {
    runSeq(['concat', 'sass', 'copy', 'replace:dev'], function() {
      livereload.reload('public/index.html');
    });
  });

  gulp.watch('bower.json', function() {
    runSeq('bower', function() {
      livereload.reload('public/index.html');
    });
  });
});

gulp.task('copy', function(){
  gulp.src('lib/templates/**')
    .pipe(gulp.dest('public/templates/'))
});

gulp.task('minjs', function() {
  gulp.src(['public/js/vendor.js', 'public/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
});

gulp.task('mincss', function() {
  gulp.src('public/css/**')
    .pipe(concat('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('replace:dev', function(){
  gulp.src(['public/index.html'])
    .pipe(replace('app.min.js', 'app.js'))
    .pipe(replace('app.min.css', 'app.css'))
    .pipe(gulp.dest('public/'))
});

gulp.task('replace:prod', function(){
  gulp.src(['public/index.html'])
    .pipe(replace('app.js', 'app.min.js'))
    .pipe(replace('app.css', 'app.min.css'))
    .pipe(gulp.dest('public/'))
});

gulp.task('build', function() {
  livereload.listen();

  gulp.watch(['lib/**/*', 'public/index.html', 'lib/templates/**'], function() {
    runSeq(['concat', 'sass', 'copy', 'minjs', 'mincss', 'replace:prod'], function() {
      livereload.reload('public/index.html');
    });
  });

  gulp.watch('bower.json', function() {
    runSeq('bower', function() {
      livereload.reload('public/index.html');
    });
  });
});












