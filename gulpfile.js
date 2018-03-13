var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var prefix = require('gulp-autoprefixer');
var connect = require("gulp-connect");
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
const babel = require('gulp-babel');


//HTML TASKS

gulp.task('html',function () {
    return gulp.src('build/index.html')
        .pipe(connect.reload());
});


//JS TASKS

gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename('bundler.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload())
});

//CSS TASKS

gulp.task('css', function (){
    return gulp.src('css/scss/*.scss')
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename("bundle.min.css"))
        .pipe(uncss({html: ['build/index.html']}))
        .pipe(gulp.dest('build/css'))
        .pipe(notify("Changes are done!"))
        .pipe(connect.reload())
});


//GULP WATCH

gulp.task('watch',function () {
    gulp.watch('css/scss/*.scss',['css'])
    gulp.watch('build/index.html',['html'])
    gulp.watch('js/common.js',['js'])
});


//GULP CONNECT

gulp.task('connect', function () {
    connect.server({
        root: "build",
        port: 3000,
        livereload: true
    });
});




gulp.task('default', ['connect','js','css','html','watch']);