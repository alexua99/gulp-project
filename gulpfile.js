'use strict';

const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const miniFycss = require('gulp-clean-css');
const sourceMap = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');

let outDir = './dist/';

const html = () => {
  return src('src/index.html')
    .pipe(dest(outDir))
    .pipe(connect.reload());;
};

function buildStyles() {
  return src('./src/sass/main.scss')
    .pipe(sourceMap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(miniFycss())
    .pipe(sourceMap.write())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('bundle.css'))
    .pipe(dest(`${outDir}css`))
    .pipe(connect.reload());
};



function gulpWatch() {
  watch('./src/sass/**/*.scss', buildStyles);
}

function htmlWatch() {
  watch('./src/**/*.html', html);
}

function server() {
  return connect.server({
    port: 8000,
    root: outDir,
    livereload: true
  })
}

exports.dev = parallel(server, htmlWatch, gulpWatch);


