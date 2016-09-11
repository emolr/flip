var gulp = require('gulp');
var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var buffer = require('vinyl-buffer');

var concat = require('gulp-concat');
var size = require('gulp-size');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

var shell = require('shelljs');

var config = {
	styles: {
		inFiles: './themes/flip/source/_scss/*.scss',
		outFiles: './themes/flip/source/css',
		watchPattern: './themes/flip/source/_scss/**/*.scss'
	},
	scripts: {
		inFiles: [
			'./themes/flip/source/_js/client/app.js'
		],
		outFiles: './themes/flip/source/js',
		watchPattern: './themes/flip/source/_js/**/*.js'
	}
};

gulp.task('styles', function() {
	return gulp.src(config.styles.inFiles)
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [
				'./node_modules/foundation-sites/scss',
			]
		}).on('error', sass.logError))
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest('.tmp/styles'))
		.pipe(size({title: 'styles'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.styles.outFiles));
});

gulp.task('scripts', () => {
	browserify({
	entries: config.scripts.inFiles,
	debug: true
	})
	.transform(babelify)
	.bundle()
	.on('error', function (err) {
		console.log(err.toString());
		this.emit("end");
	})
	.pipe(source('app.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
	.pipe(gulp.dest('.tmp/scripts'))
	//.pipe(streamify(uglify({preserveComments: 'some'})))
	//.pipe(streamify(concat('app.min.js')))
	.pipe(gulp.dest(config.scripts.outFiles))
	.pipe(reload({stream: true}));
});

gulp.task('scripts2', function() {
	return gulp.src(config.scripts.inFiles)
		browserify({
		  entries: config.styles.inFiles,
		  debug: true
		})
		.transform(babelify)
		.bundle()
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('.tmp/scripts'))
		.pipe(concat('app.min.js'))
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(size({title: 'scripts'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.scripts.outFiles));
});

gulp.task('clean', function() {
	del(['.tmp'], {dot: true});
});

gulp.task('serve', ['styles', 'scripts'], function() {
	browserSync({
		notify: false,
		files: ['public/**/*.*'],
		server: {
			baseDir: 'public',
			routes: {
				'/flip': 'public'
			}
		}
	});

	gulp.watch([config.styles.watchPattern], ['styles', reload]);
	gulp.watch([config.scripts.watchPattern], ['scripts', reload]);
});

gulp.task('serve:static', ['styles', 'scripts'], function() {
	browserSync({
		notify: false,
		files: ['public/**/*.*'],
		server: {
			baseDir: 'public',
			routes: {
				'/flip': 'public'
			}
		}
	});
});

gulp.task('default', ['clean', 'serve']);
gulp.task('build', ['clean', 'styles', 'scripts'], function() {
	shell.exec('hexo generate');
});