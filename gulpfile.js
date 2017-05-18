'use strict';

// ソース元の対象ファイル
var source_file = './src/js/main.js';
// 出力ディレクトリ
var dist_dir = './public/js/';
// アプリファイル
var appjs = 'main.js';
// minify後のアプリ名ファイル
var appminjs = 'main.min.js';

// gulp watch で開く html
var html_dir = "public";
var html = "index.html";

var watch      = require('gulp-watch');
var browserify = require('browserify');
var stringify  = require('stringify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var uglify     = require("gulp-uglify");
var rename     = require('gulp-rename');
var plumber    = require('gulp-plumber');
var runSequence= require('run-sequence');
var path       = require('path');
var notify     = require('gulp-notify');
var browserSync= require('browser-sync').create();

gulp.task('browserify', function() {
	return browserify(source_file)
		.transform(stringify, {
			appliesTo: { includeExtensions: ['.vs', '.fs'] }, // シェーダーファイルをテキストとして require できるようにする
		})
		.bundle()
		.on('error', function(err){   //ここからエラーだった時の記述
			// デスクトップ通知
			var error_handle = notify.onError('<%= error.message %>');
			error_handle(err);
			this.emit('end');
		})
		.pipe(source(appjs))
		.pipe(gulp.dest(dist_dir));
});

gulp.task('minify', function() {
	return gulp.src(path.join(dist_dir, appjs))
		.pipe(uglify())
		.pipe(rename(appminjs))
		.pipe(gulp.dest(dist_dir));
});


gulp.task('reload', function () {
	return browserSync.reload();
});

gulp.task('build', function(callback) {
	return runSequence(
		'browserify',
		'minify',
		'reload',
		callback
	);
});

gulp.task('browser-sync', function() {
	return browserSync.init({
		server: {
			baseDir: html_dir,
			index: html,
		}
	});
});

gulp.task('watch', ['browser-sync'], function() {
	watch(['src/js/**/*.js'], function(event) {
		gulp.start("build");
	});
});
