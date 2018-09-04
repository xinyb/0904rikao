var gulp = require('gulp');
var sass = require('gulp-sass'); //编译scss
var minCss = require('gulp-clean-css'); //压缩css
var server = require('gulp-webserver'); //服务器
var url = require('url');
var fs = require('fs');
var path = require('path');

//编译sass压缩css
gulp.task('devCss', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});

//监听css
gulp.task('watch', function() {
    return gulp.watch('./src/sass/**/*.scss', gulp.series('devCss'))
})

//启服务
gulp.task('devServer', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 6767,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                };
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});

//开发环境
gulp.task('dev', gulp.series('devCss', 'devServer', 'watch'))