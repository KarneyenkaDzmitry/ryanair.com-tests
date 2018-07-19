'use strict';

const { When, Then, Given } = require('cucumber');
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');

Given('I open url {string}', { timeout: 20000 }, function (string) {
    return browser.get(string);
});

Then('The url is {string}', { timeout: 20000 }, function (string) {
    return browser.getCurrentUrl()
        .then((url) => expect(url).to.be.equal(string));
});

Then('see the text {string}, {string} at the header', { timeout: 20000 }, function (singin, login) {
    header.getSigninText()
        .then((text) => expect(text).to.be.equal(singin));
    return header.getLoginText()
        .then((text) => expect(text).to.be.equal(login));
});

Then('the button with text {string}', function (button) {
    return header.getMainButtonText()
        .then((text) => expect(text).to.be.equal(button));
});

When('I choose country {string}', function (country) {
    return header.chooseLanguage(country);
});

When('I fill form for reason to buy {string} ticket from {string} to {string},out date {string}, back date {string} for {string} passengers',
 function (ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
console.log(`There are: ${ticket}, ${from_airport}, ${to_airport}, ${fly_out}, ${fly_back}, ${passengers}`);
});

Then('I see the page with next step with entered before data at the left side of the top of page in order:'+
'from {string} to {string} {string} {string}',
 function (ticket, from_airport, to_airport, passengers) {
    console.log(`There are: ${ticket}, ${from_airport}, ${to_airport}, ${passengers}`);
});