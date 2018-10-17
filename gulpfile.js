var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var browserSync = require('browser-sync');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var glob = require('glob');
var es = require('event-stream');
var flatten = require('gulp-flatten');
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var cssfont64 = require('gulp-cssfont64');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll website
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll and reload the page
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for the jekyll-build task, then start the server
 */
gulp.task('browser-sync', ['sass','js','jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function () {
    return gulp.src('_sass/main.sass')
        .pipe(sass({
            includePaths: ['sass'],
            outputStyle: 'compressed',
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
    gulp.src([
        './_js/src/libs/jquery/dist/jquery.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/js/'))
    .pipe(gulp.dest('js/'));

    return gulp.src('./_js/src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./_site/js/'))
    .pipe(gulp.dest('js/')); 
});

gulp.task('watch', function () {
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch('_js/**/*.js', ['js']);
    gulp.watch(['*.html', '_layouts/*.html', '_pages/*', '_posts/*', '_data/*', '_includes/*'], ['jekyll-rebuild']);
});

gulp.task('fontsConvert', function () {
    return gulp.src(['_fonts/*.woff', '_fonts/*.woff2'])
        .pipe(cssfont64())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'fontsConvert', 'watch']);