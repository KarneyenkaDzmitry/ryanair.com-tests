'use strict';
const { logger } = require('./configs/logger.conf');
const gulp = require('gulp');
const shell = require('gulp-shell');
const runSequence = require('run-sequence').use(gulp);
const protractor = require("gulp-protractor").protractor;

gulp.task('start', ['server'], () => {
    logger.info('Run gulp, task - start');
    return gulp.src([])
        .pipe(protractor({
            configFile: "./configs/conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', (err) => {
            logger.error('Protactor error. Tests - FAILED', err);
            runSequence('report');
        });

});

gulp.task('server', (done) => {
    logger.info('Run gulp, task - server');
    gulp.src('', { read: false })
        .pipe(shell([
            'start cmd /k "node_modules\\.bin\\webdriver-manager start"'
        ]));
    setTimeout(() => {
        done();
    }, 7000);
});

gulp.task('linter', () => {
    logger.info('Run  gulp, task - linter');
    return gulp.src('', { read: false })
        .pipe(shell([
            'eslint ./ --fix'
        ]));
});

gulp.task('report', () => {
    logger.info('Run  gulp, task - report');
    return gulp.src('', { read: false })
        .pipe(shell([
            'node reporter.js'
        ]));
});

gulp.task('default', () => {
    logger.info('Run via gulp task - default');
    runSequence('start', 'report');
});
