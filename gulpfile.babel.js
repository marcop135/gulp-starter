'use strict';

// Import specific gulp API functions
import { src, dest, watch, series, parallel } from 'gulp';

// Import necessary plugins
import gulpSass from 'gulp-sass'; 
import sass from 'sass'; // Dart Sass
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

// Initialize gulp-sass with Dart Sass
const sassCompiler = gulpSass(sass);

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

// Task for compiling SCSS to CSS
function scssTask() {
  return src('src/assets/scss/**/*.scss')
    .pipe(sassCompiler({ outputStyle: 'expanded' }).on('error', sassCompiler.logError)) // Dart Sass error handling
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('dist/assets/css'))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/css', { sourcemaps: '.' }));
}

// Task for JavaScript (ES6+ to ES5, concatenation, and minification)
function jsTask() {
  return src('src/assets/js/**/*.js')
    .pipe(babel()) // Transpile JavaScript
    .pipe(concat('app.min.js')) // Concatenate JS files
    .pipe(dest('dist/assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify()) // Minify JS
    .pipe(dest('dist/assets/js', { sourcemaps: '.' }));
}

// Task for Image optimization
function imageTask() {
  return src('src/assets/images/**/*.*')
    .pipe(imagemin()) // Optimize images
    .pipe(dest('dist/assets/images'));
}

// Task for Cache Busting (timestamping assets)
function cacheBustTask() {
  return src('./*.html')
    .pipe(cachebust({ type: 'timestamp' })) // Add timestamp for cache busting
    .pipe(dest('dist/'));
}

// Watch task for automatic reloading on file changes
function watchTask() {
  watch(
    ['./*.html', 'src/assets/scss/**/*.scss', 'src/assets/js/**/*.js', 'src/assets/images/**/*.*'],
    series(parallel(scssTask, jsTask, imageTask, cacheBustTask), reload)
  );
}

// Build task to execute all tasks
export const build = series(parallel(scssTask, jsTask, imageTask, cacheBustTask));

// Default task to execute build, serve, and watch
export default series(parallel(scssTask, jsTask, imageTask, cacheBustTask), serve, watchTask);
