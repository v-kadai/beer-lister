const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');

gulp.task('default', ['sass', 'lint'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['lint']);
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
