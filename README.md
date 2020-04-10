# File processing boilerplate for HTML, Sass, JS, images and SVG with Gulp.js via Node.js

Using a set of boilerplate files when you're starting a website project can be a huge time-saver. Instead of having to start from scratch or copy and paste from previous projects, you can get up and running in just a minute or two.

You can read [the original project's blog post here](https://coder-coder.com/gulp-4-walk-through).
Kudos to @thecodercoder

## Quickstart guide

* Clone or download this Git repo onto your computer.
* Install [Node.js](https://nodejs.org/en/) if you don't have it yet.
* Run `npm install`
* Run `gulp` to run the default Gulp task

In this project, Gulp will be configured to run the following functions:

* Install a local server for live-reloading with [browsersync] https://www.npmjs.com/package/browser-sync 
* Compile the SCSS files to CSS with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* Minify the CSS files with [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
* Autoprefix the CSS files with [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* Extract critical CSS rules into a seperate stylesheet with [critical-css](https://www.npmjs.com/package/gulp-critical-css)
* Concatenate the JS files with [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* Transpile the JS files with [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* Uglify the JS files with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* Create SCSS/JS sourcemaps with [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* Compress the images with [image-min](https://www.npmjs.com/package/gulp-imagemin)
* Compress the SVGs with [svg-min](https://www.npmjs.com/package/gulp-svgmin)
* Append a query string in the index.html file to the final CSS and JS files for cache-busting with [gulp-cache-bust](https://www.npmjs.com/package/gulp-cache-bust)
* Move final CSS, JS, images and SVGs files to the `/dist` folder

