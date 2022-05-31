'use strict';

const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const miniFycss = require('gulp-clean-css');
const sourceMap = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const open = require('gulp-open');
const fileinclude = require('gulp-file-include');
const include = require('gulp-include')
const del = require('del');

const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');


const localServer = {
  out: './dist/',
  port: 9090,
  url: 'http://localhost:',
}

function html() {
  return src('src/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest(localServer.out))
    .pipe(connect.reload());;
};

function css() {
  return src('./src/sass/main.scss')
    .pipe(sourceMap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(miniFycss())
    .pipe(sourceMap.write())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('bundle.css'))
    .pipe(dest(`${localServer.out}css`))
    .pipe(connect.reload());
};

function js() {
  return src('./src/js/index.js')
    .pipe(changed('./dist/js/*.js'))
    .pipe(include({
      extensions: 'js',
      hardFail: true,
      separateInputs: true,
    }))
    .on('error', console.log)
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(`${localServer.out}/js`));
}

function img() {
  return src('src/img/**/*')
    .pipe(changed('./dist/img/'))
    .pipe(imagemin())
    .pipe(dest(`${localServer.out}img`))
};

function gulpWatch() {
  watch('./src/**/*.html', html);
  watch('./src/sass/**/*.scss', css);
  watch('./src/js/**/*.js', js);
  watch('./src/img/**/*', img);
}

function clean() {
  return del(['dist/**', '!dist'])
}

function server() {
  return connect.server({
    port: localServer.port,
    root: localServer.out,
    livereload: true,
  })
}

function openLocal() {
  return src('./dist/index.html')
    .pipe(open({ uri: `${localServer.url}${localServer.port}/` }))
}

exports.dev = parallel(clean, server, html, css, js, img, gulpWatch);


