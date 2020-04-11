# File processing boilerplate for Sass, JS, PNG, JPEG, GIF and SVG images with Gulp.js

Using a set of boilerplate files when you're starting a website project can be a huge time-saver. Instead of having to start from scratch or copy and paste from previous projects, you can get up and running in just a minute or two.

You can read [the original project's blog post here](https://coder-coder.com/gulp-4-walk-through).
Kudos to @thecodercoder

## Quickstart guide

* Clone or download this Git repo onto your computer.
* Install [Node.js](https://nodejs.org/en/) if you don't have it yet.
* Run `npm install`
* Run `gulp` to run the default Gulp task

In this project, Gulp will be configured to run the following functions:

* Install a local server for live-reloading with [browsersync](https://www.npmjs.com/package/browser-sync)
* Compile the SCSS files to CSS with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* Autoprefix the CSS file with [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
* Minify the CSS file with [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
* Transpile the JS file with [gulp-babel](https://www.npmjs.com/package/gulp-babel)
* Concatenate the JS files with [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* Uglify the JS file with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* Create SCSS/JS sourcemaps with [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* Compress the images with [image-min](https://www.npmjs.com/package/gulp-imagemin)
* Move final CSS, JS and image files to the `/dist` folder
