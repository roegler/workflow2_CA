const { watch, series, src, dest } = require('gulp')
const gulp = require('gulp');
const imagemin = require ('gulp-imagemin');
const browserSync = require ('browser-sync').create();
const less = require ('gulp-less');
const cssmin = require('gulp-cssmin')

function reloadBrowser(cb) {
    browserSync.reload()
    cb()
}

function imageMinify(cb) {
    src('./src/images/*')
        .pipe(imagemin({
            optimizationLevel: 10,
        }))
        .pipe(dest('dist/images'))
        cb()
}

function copyToDist(cb) {
    src('src/*.html')
    src('src/*.ttf')
    .pipe(dest('dist/'))
    cb()
}

function lessToCss(cb) {
    src ('./src/*.less')
    .pipe(less())
    .pipe(dest('dist/'))
    .pipe(cssmin())
    .pipe(dest('dist/'))
    cb()
}

exports.default = function() {
    series(copyToDist, imageMinify, lessToCss)()

    browserSync.init({
        server: {
            baseDir: './dist',
        }
    });

    watch('src/*.html', series(copyToDist, reloadBrowser))
    watch('src/images/*', series(imageMinify, reloadBrowser))
}


