'use strict';

// Initialize modules
// Import specific gulp API functions lets us write them below as series()
// instead of gulp.series()
import { src, dest, watch, series, parallel } from 'gulp';

// Import all the Gulp-related packages we want to use
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import imagemin from 'gulp-imagemin';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cachebust from 'gulp-cache-bust';
import browserSync from 'browser-sync';

const server = browserSync.create();

// setup the BrowserSync server
function reload(done) {
  server.reload();
  done();
}
function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
}

// File paths to watch
const files = {
  htmlPath: './*.html',
  scssPath: 'src/assets/scss/**/*.scss',
  jsPath: 'src/assets/js/**/*.js',
  imagePath: 'src/assets/images/**/*.*',
};

// Sass task
// compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(dest('dist/assets/css', { sourcemaps: '.' })); // put final CSS in dist folder
}

// JS task
// concatenates and uglifies JS files
function jsTask() {
  return src([
    files.jsPath,
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ], { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/assets/js', { sourcemaps: '.' }));
}

// image task
// compress PNG, JPEG, GIF and SVG images
function imageTask() {
  return src(files.imagePath).pipe(imagemin()).pipe(dest('dist/assets/images'));
}

// cache busting task
// add a timestamp string to CSS/JS style/script
function cacheBustTask() {
  return src(files.htmlPath)
    .pipe(
      cachebust({
        type: 'timestamp',
      })
    )
    .pipe(dest('dist/'));
}

// watch task: watch SCSS, JS, image and HTML files for changes
// If any change, run scss, js and image tasks simultaneously
// then reload via browsersync
function watchTask() {
  watch(
    [files.htmlPath, files.scssPath, files.jsPath, files.imagePath],
    series(parallel(scssTask, jsTask, imageTask, cacheBustTask), reload)
  );
}

// Export the default Gulp task so it can be run
// Runs the scss, js, image and cache busting tasks simultaneously
// start local server and watch tasks
export default series(
  parallel(scssTask, jsTask, imageTask, cacheBustTask),
  serve,
  watchTask
);
