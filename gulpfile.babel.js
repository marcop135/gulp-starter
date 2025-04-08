'use strict';

// Initialize modules
// Import specific gulp API functions lets us write them below as series()
// instead of gulp.series()
import { src, dest, watch, series, parallel } from 'gulp';

import gulp from 'gulp';

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

// Setup BrowserSync server
const server = browserSync.create();

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

// Task for Sass
function scssTask() {
  return src('src/assets/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('dist/assets/css'))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/css', { sourcemaps: '.' }));
}

// Task for JS
function jsTask() {
  return src('src/assets/js/**/*.js')
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(dest('dist/assets/js', { sourcemaps: '.' }));
}

// Task for Images
function imageTask() {
  return src('src/assets/images/**/*.*')
    .pipe(imagemin())
    .pipe(dest('dist/assets/images'));
}

// Task for Cache Busting
function cacheBustTask() {
  return src('./*.html')
    .pipe(cachebust({ type: 'timestamp' }))
    .pipe(dest('dist/'));
}

// Watch Task
function watchTask() {
  watch(['./*.html', 'src/assets/scss/**/*.scss', 'src/assets/js/**/*.js', 'src/assets/images/**/*.*'],
    series(parallel(scssTask, jsTask, imageTask, cacheBustTask), reload));
}

// Build Task
gulp.task('build', series(parallel(scssTask, jsTask, imageTask, cacheBustTask)));

// Export the default task
export default series(parallel(scssTask, jsTask, imageTask, cacheBustTask), serve, watchTask);