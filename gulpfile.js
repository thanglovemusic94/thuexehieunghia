// see video explanation: https://youtu.be/ubHwScDfRQA
// https://stackoverflow.com/questions/42892537/how-to-use-browser-sync-with-php
//https://ebudezain.com/cach-cau-hinh-gulp-va-browser-sync-cho-project

const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); // This is different from the video since gulp-sass no longer includes a default compiler. Install sass as a dev dependency `npm i -D sass` and change this line from the video.
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

const clean = require('gulp-clean');
const purgecss = require('gulp-purgecss')
//const browserSync = require('browser-sync').create();
const browserSync = require('browser-sync');
const reload = browserSync.reload();
const connect = require('gulp-connect-php');

function compileScss() {
    return src('./public/assets/scss/**/*.scss') // change to your source directory
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        // .pipe(purgecss({
        //     content: ['./app/Views/**/*.php']
        // }))
        .pipe(minify())
        .pipe(dest('./public/assets/css')) // change to your final/public directory
        .pipe(browserSync.stream());
};

function connectPHP() {
    connect.server({}, function () {
        browserSync({
            proxy: 'localhost:8080'
        });
    });
}

function watchTask() {
    //watch('./public/assets/scss/**/*.scss', compileScss); // change to your source directory
    watch(['**/*.php', './public/assets/scss/**/*.scss'], connectPHP).on('change', function () {
        // cleanTask();
        // compileScss();
        browserSync.reload();
    });

}

function cleanTask() {
    // body omitted
    return src('./public/assets/css/*.css', {read: false})
        .pipe(clean());
}


// Default Gulp task
exports.default = series(
    cleanTask,
    compileScss,
    watchTask
);