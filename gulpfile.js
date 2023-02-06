'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten'),
    cleanCompiledTypeScript = require('gulp-clean-compiled-typescript');

gulp.task('cleantypescript', function() {
    return gulp.src('./src/**/*.ts')
        .pipe(cleanCompiledTypeScript());
});;

gulp.task('build-css', function() {
	gulp.src([
        'src/app/components/common/common.css',
		    'src/app/components/**/*.css'
    ])
        .pipe(concat('primeng.css'))
        .pipe(gulp.dest('resources'));
});

gulp.task('build-css-prod', function() {
    gulp.src([
        'src/app/components/common/common.css',
        'src/app/components/**/*.css'
    ])
    .pipe(concat('primeng.css'))
    .pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primeng.min.css'))
    .pipe(gulp.dest('resources'));
});

gulp.task('copy-component-css', function () {
    gulp.src([
        'src/app/components/**/*.css'
    ])
    .pipe(gulp.dest('resources/components'));
});

gulp.task('images', function() {
    return gulp.src(['src/app/components/**/images/*.png', 'src/app/components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

gulp.task('themes', function() {
    return gulp.src(['src/assets/components/themes/**/*'])
        .pipe(gulp.dest('resources/themes'));
});

gulp.task('build-exports', function() {
    return gulp.src(['exports/*.js','exports/*.d.ts'])
        .pipe(gulp.dest('./'));
});

gulp.task('build-components', function() {
    return gulp.src(['components/**/*.js','components/**/*.d.ts', '!components/**/*.spec.d.ts', 'components/**/*.spec.js'])
        .pipe(flatten()).pipe(gulp.dest('./exports/'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function() {
	del(['resources']);
});

//Building project with run sequence
gulp.task('build-assets', ['clean','copy-component-css', 'build-css-prod', 'images', 'themes']);

