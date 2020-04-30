var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });

    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/*.js").on('change', browserSync.reload);
    gulp.watch("public/*.css").on('change', browserSync.reload);
});