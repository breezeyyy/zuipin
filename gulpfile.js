const {
    src,
    dest,
    watch
} = require("gulp");
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
    return src('./src/sass/*.scss')
        .pipe(sass({
            indentWidth: 4
        }).on('error', sass.logError))
        .pipe(dest('./src/dist/css'));
}

exports.bs = buildStyles;

exports.watch = function () {
    watch('./src/sass/**/*.scss', buildStyles);
}