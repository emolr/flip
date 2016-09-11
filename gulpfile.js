var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var config = {
	styles: {
		inFiles: './themes/flip/source/_scss/*.scss',
		outFiles: './themes/flip/source/css',
		watchPattern: './themes/flip/source/_scss/**/*.scss'
	}
};

gulp.task('styles', function() {
	return gulp.src(config.styles.inFiles)
			.pipe(sourcemaps.init())
			.pipe(scss({
				includePaths: [
					'node_modules/foundation-sites/scss'
				]
			}).on('error', scss.logError))
			.pipe(sourcemaps.write())
			.pipe(autoprefixer())
			.pipe(gulp.dest(config.styles.outFiles));
});
gulp.task('styles:watch', function() {
	gulp.watch(config.styles.watchPattern, ['styles']);
});

gulp.task('clean', function() {
	// DEL
});

gulp.task('browserSync', function() {
	browserSync.init({
		files: ['public/**/*.*'],
		server: {
			baseDir: 'public',
			routes: {
				'/flip': 'public'
			}
		}
	})
});

gulp.task('default', ['styles:watch', 'browserSync']);