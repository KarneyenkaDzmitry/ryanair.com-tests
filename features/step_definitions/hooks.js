"use strict";

// const {defineSupportCode} = require('cucumber');
const {After, Before, Status} = require('cucumber');

// defineSupportCode(function ({After}) {

//     After(function (scenario) {
//         const world = this;
//     if (scenario.result.status === Status.FAILED) {
//             return browser.takeScreenshot().then(function (screenShot) {
//                 // screenShot is a base-64 encoded PNG
//                 world.attach(screenShot, 'image/png');
//             });
//         }
//     });
// });
const {setDefaultTimeout} = require('cucumber'); 
const fs = require('fs');
setDefaultTimeout(60 * 1000);

After(function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        return browser.takeScreenshot().then((screenShot) => {
            let decodedImage = new Buffer(screenShot, 'base64');    
            return this.attach(decodedImage, 'image/png');
        });
    }
});

// module.exports = After;