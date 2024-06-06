const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'));

function compileSassToCss () {
    return src('src/scss/**/*.{scss,sass}')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'))
}

function watchTask() {
    watch(['src/scss/**/*.{scss,sass}'], compileSassToCss)
}

exports.default = series(compileSassToCss, watchTask)