const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
  './node_modules/normalize.css/normalize.css', //or bower
  './src/css/style.css',
  './src/css/other.css'
]

const jsFiles = [
  './src/js/lib.js',
  './src/js/some.js'
]

function styles() {
  //return gulp.src("./src/**/*.css")
  return gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCss({
      compatibility: 'ie8',
      level:2
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src(jsFiles)
     .pipe(concat('all.js'))
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch("./src/css/**/*.css", styles)
  gulp.watch("./src/js/**/*.js", scripts)
  gulp.watch("./*.html", browserSync.reload)
}

function dell() {
  return del(['build/*'])
}


gulp.task('styles', styles)
gulp.task('scripts', scripts)
// gulp.task('dell', dell)
// gulp.task('watch', watch)

gulp.task('build', gulp.series(dell,
                     gulp.parallel(styles, scripts)
                   ));
      gulp.task('dev', gulp.series('build', watch))

// module.exports.watch = watch;
// module.exports.clean = clean;
