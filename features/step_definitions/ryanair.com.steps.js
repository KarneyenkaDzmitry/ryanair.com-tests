'use strict';
const { When, Then, Given , setDefaultTimeout } = require('cucumber');
setDefaultTimeout(20*5000);
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');
const main = require('../../page-objects/main.page');
const nextstep = require('../../page-objects/nextstep.page');

Given('I open url {string}', function (string) {
    return browser.get(string);
});

Then('The url is {string}', function (string) {
    return browser.getCurrentUrl()
        .then((url) => expect(url).to.be.equal(string));
});

Then('see the text {string}, {string} at the header', function (singin, login) {
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

When('I fill form for reason to buy {string} ticket from {string} '+
'to {string},out date {string}, back date {string} for {string} passengers',
 function (ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
     return main.fillMainForm(ticket, from_airport, to_airport, fly_out, fly_back, passengers);
});

Then('I see the page with next step with entered before data at the left side of the top of page in order:'+
'from {string} to {string} {string} {string}',
 function (from_airport, to_airport, ticket, passengers) {
    return  browser.driver.sleep(3000)
    .then(()=>browser.driver.getAllWindowHandles())
    .then((handlers)=> browser.driver.switchTo().window(handlers[1]))
    .then(()=>nextstep.getAirportsText())
    .then((text)=>expect(text).to.be.equal(`${from_airport} to ${to_airport}`))
    .then(()=>{
        if (passengers==='default') {
            return nextstep.getBreakpointText()
            .then((text)=>expect(text).to.be.equal(`${ticket} 1 Adult Change`))
        }});
});