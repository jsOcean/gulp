var gulp = require('gulp');

var sass = require('gulp-sass');

var browserSync = require('browser-sync');

var useref = require('gulp-useref');

var uglify = require('gulp-uglify');

var gulpIf = require('gulp-if');

var minifyCSS = require('gulp-minify-css');

gulp.task('hello', function () {
    console.log("hello");
})


// gulp.task('sass', function () {
//     return gulp.src('./app/scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./app/css/'))
// })



// gulp.task('watch', function () {
//     gulp.watch('./app/scss/**/*.scss', ['sass']);
// })

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})



gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Other watchers
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})

// gulp.task('useref', function () {

//     return gulp.src('app/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });


// gulp.task('useref', function () {
//     return gulp.src('app/*.html')
//         .pipe(uglify()) // Uglifies Javascript files
//         .pipe(useref())
//         .pipe(gulp.dest('dist'))
// });


gulp.task('useref', function () {

    return gulp.src('app/*.html')
        // Minifies only if it's a CSS file
        .pipe(gulpIf('dist/css/*.css', minifyCSS()))
        // Uglifies only if it's a Javascript file
        .pipe(gulpIf('dist/**/*.js', uglify()))
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

var del = require('del');
gulp.task('clean', function () {
    del('dist');
});



gulp.task('build', [`clean`, `sass`, `useref`, `images`, `fonts`], function () {
    console.log('Building files');
})