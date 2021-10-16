const {
    src,
    dest,
    watch
} = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));

exports.watch = function () {
    // 字体图标转存
    watch("./src/font/*", function() {
        return src("./src/font/*")
                .pipe(dest("./dist/font"));
    })

    // 彩色字体图标转存
    watch("./src/font_color/*", function() {
        return src("./src/font_color/*")
                .pipe(dest("./dist/font_color"));
    })

    // 图片转存
    watch("./src/images/**/*", function () {
        return src("./src/images/**/*")
            .pipe(dest("./dist/images"));
    })

    // JS文件，ES6转ES5转存
    watch("./src/js/*.js", function() {
        return src("./src/js/*.js")
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(dest("./dist/js"));
    })

    // 第三方JS转存
    watch("./src/libs/*.js", function() {
        return src("./src/libs/*.js")
                .pipe(dest("./dist/libs"));
    })

    // 已封装的模块JS， ES6转ES5转存
    watch("./src/modules/**/*.js", function() {
        return src("./src/modules/**/*.js")
                .pipe(babel({
                    presets: ['@babel/env']
                }))
                .pipe(dest("./dist/modules"));
    })

    // 编译sass
    watch("./src/sass/*.scss", function () {
        return src("./src/sass/*.scss")
                .pipe(sass({
                    indentWidth: 4
                }).on('error', sass.logError))
                .pipe(dest("./dist/css"));
    })
    
    // 转存html文件
    watch("./src/*.html", function() {
        return src("./src/*.html")
                .pipe(dest("./dist"))
    })
};