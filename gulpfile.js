// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");

// Importing all the Gulp-related packages we want to use
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
var replace = require("gulp-replace");

// File paths
const files = {
  scssPath: "src/assets/scss/**/*.scss",
  jsPath: "src/assets/js/**/*.js",
  imagesPath: "src/assets/images/**/*.*",
};

// Sass task: compiles the style.scss file into style.css
function scssTask() {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
    .pipe(sourcemaps.write(".")) // write sourcemaps file in current directory
    .pipe(dest("dist/assets/css")) // put final CSS in dist folder
    .pipe(browserSync.stream()); // livereload
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src([
    files.jsPath,
    //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/js"));
}

// images task: Minify PNG, JPEG, GIF and SVG images
function imagesTask() {
  return src(files.imagesPath)
    .pipe(imagemin())
    .pipe(dest("dist/assets/images"));
}

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Watch task: watch SCSS, JS and image files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true }, //Makes docker work
    series(parallel(scssTask, jsTask, imagesTask), cacheBustTask)
  );
}

// Export the default Gulp task so it can be run
// Runs the scss, js and images tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
  parallel(scssTask, jsTask, imagesTask),
  cacheBustTask,
  watchTask
);
