# [Gulp.js](https://gulpjs.com/) Starter — File Processing Boilerplate (HTML, CSS, Sass, JS, PNG, JPEG, GIF, SVG)

Using a set of boilerplate files when you're starting a website project can be a huge time-saver. Instead of having to start from scratch or copy and paste from previous projects, you can get up and running in just a minute or two.

You can read the original project's blog post [here](https://coder-coder.com/gulp-4-walk-through).
Kudos to [@thecodercoder](https://github.com/thecodercoder)

## Quickstart guide

- Clone or download this Git repo onto your computer.
- Install [Node.js](https://nodejs.org/en/) if you don't have it yet.
- Install the [gulp command line utility](https://gulpjs.com/docs/en/getting-started/quick-start#install-the-gulp-command-line-utility) if you don't have it yet.
- Run `npm install`
- Run `gulp` to run the default Gulp task

## Gulp plugins

In this project, [Gulp](https://gulpjs.com/) will be configured to run the following functions:

- Install a local server for live-reloading with [browsersync](https://www.npmjs.com/package/browser-sync)
- Compile the SCSS files to CSS with [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- Autoprefix the CSS file with [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- Rename compressed CSS/JS files [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- Minify the CSS file with [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
- Transpile the JS file with [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- Concatenate the JS files with [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- Uglify the JS file with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- Compress the images with [image-min](https://www.npmjs.com/package/gulp-imagemin)
- Bust the cache with [gulp-cache-bust](https://www.npmjs.com/package/gulp-cache-bust)
- Move final files to the `/dist` folder

## Compatibility

Tested with:

- Node.js v22.14.0
- npm v10.9.2

If you're using nvm, check the `.nvmrc` file.
