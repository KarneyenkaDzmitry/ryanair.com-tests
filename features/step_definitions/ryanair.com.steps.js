'use strict';

const { When, Then, Given } = require('cucumber');
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');

// Given('I open url {string}', { timeout: 20000 }, function (string) {
//     return browser.get(string);
// });

// Then('The url is {string}', { timeout: 20000 }, function (string) {
//     return browser.getCurrentUrl()
//         .then((url) => expect(url).to.be.equal(string));
// });

// Then('see the text {string}, {string} at the header', { timeout: 20000 }, function (singin, login) {
//     //expect(header.getSigninText()).to.be.equal(singin);
//     //return expect(header.getLoginText()).to.be.equal(login);
// });

// Then('the button with text {string}', function (button) {
//     //return header.getMainButtonText()
//         //.then((text) => expect(text).to.be.equal(button));
// });

// When('I choose country {string}', function (country) {
//     //return header.chooseLanguage(country);
// });