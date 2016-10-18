const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const cache = require('gulp-cached');


const paths = {
  sass: "./src/**/*.scss",
  js: "./src/js/**/*.js",
  html: "./src/*.html"
}


gulp.task('converthtml', function(){
    return gulp.src(paths.html)
            .pipe(cache('htmlcache'))
            .pipe(gulp.dest('./dist'))
});

gulp.task('convertcss', function(){
  return sass(paths.sass)
          .on('error', sass.logError)
          .pipe(cache('csscache'))
          .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function(){
  gulp.watch(paths.sass, ['convertcss']);
  gulp.watch(paths.html, ['converthtml']);
});
