'use strict';

const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence').use(gulp);
const protractor = require("gulp-protractor").protractor;

gulp.task('start', ['server'], () => {
    return gulp.src([])
        .pipe(protractor({
            configFile: "./configs/conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', (err) => {
            throw err;
        });
});

gulp.task('server', (done) => {
    gulp.src('', { read: false })
        .pipe(shell([
            'start cmd /k "node_modules\\.bin\\webdriver-manager start"'
        ]));
    setTimeout(() => {
        done();
    }, 7000);
});


gulp.task('npm_install', () => {
    return gulp.src('', { read: false })
        .pipe(shell([
            'npm install'
        ]));
});

gulp.task('linter', () => {
    return gulp.src('', { read: false })
        .pipe(shell([
            'eslint ./ --fix'
        ]));
});

gulp.task('build', ['npm_install', 'linter']);

gulp.task('report', () => {
    return gulp.src('', { read: false })
        .pipe(shell([
            'node reporter.js'
        ]));
});

gulp.task('default',()=>{
    runSequence('start', 'report');
});
