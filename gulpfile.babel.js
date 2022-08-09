'use strict';

// Initialize modules
// Import specific gulp API functions lets us write them below as series()
// instead of gulp.series()
import { src, dest, watch, series, parallel } from 'gulp';

// Upgrade gulp-sass to v5
// https://github.com/dlmanning/gulp-sass/tree/master#migrating-to-version-5
const sass = require('gulp-sass')(require('sass'));

// Import all the Gulp-related packages we want to use
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
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
  return (
    src(files.scssPath)
      .pipe(sass({ outputStyle: 'expanded' }))
      // PostCSS plugins
      .pipe(postcss([autoprefixer()]))

      // write pre-minifies styles
      .pipe(dest('dist/assets/css'))

      // PostCSS plugins
      .pipe(postcss([cssnano()]))

      // rename files
      .pipe(
        rename({
          suffix: '.min',
        })
      )

      // put final CSS file in dist folder
      .pipe(
        dest('dist/assets/css', {
          sourcemaps: '.',
        })
      )
  );
}

// JS task
// concatenates and uglifies JS files
function jsTask() {
  return (
    src(files.jsPath)
      //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files

      // transpile files
      .pipe(babel())

      // concat files
      .pipe(concat('app.min.js'))

      // write pre-minifies files
      .pipe(dest('dist/assets/js'))

      // rename files
      .pipe(
        rename({
          suffix: '.min',
        })
      )

      // minify scripts
      .pipe(uglify())

      // put final JS file in /dist folder
      .pipe(
        dest('dist/assets/js', {
          sourcemaps: '.',
        })
      )
  );
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
