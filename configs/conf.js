'use strict';
const logger = require('./logger.conf.js').logger;

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        "require": '../features/step_definitions/*steps.js',
        "tags": false,
        "profile": false,
        'no-source': true,
        format: 'json:./reports/report.json'
    },
    specs: ['../features/*.feature'],
    baseURL: 'http://localhost:8080/',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        }
    },
    onPrepare: function() {
        logger.info('Browser starts in maximize size for running tests');
        browser.driver.manage().window().maximize();
        browser.driver.manage().timeouts().implicitlyWait(20000);
        browser.waitForAngularEnabled(true);
        global.ec = protractor.ExpectedConditions;
    },
    beforeLaunch: () => {
        logger.info('Get started!');
    },
    afterLaunch: () => {
        logger.info('Done');
    }
};