const gulp        = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');


gulp.task('build_js', function(){
    return gulp.src('assets/js/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
})

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('styles', function() {
    return gulp.src("assets/css/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())

        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("assets/css/**/*.+(scss|sass)", gulp.parallel('styles'));

})
gulp.task('watch_js', function(){
    gulp.watch("assets/js/*.js", gulp.parallel('build_js'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'build_js', 'watch_js'));
