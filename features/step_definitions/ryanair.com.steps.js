'use strict';
const { When, Then, Given, setDefaultTimeout } = require('cucumber');
const { logger } = require('../../configs/logger.conf');
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');
const main = require('../../page-objects/main.page');
const nextstep = require('../../page-objects/nextstep.page');
setDefaultTimeout(20 * 5000);

Given(/^I open url '([^']*)'$/, function (url) {
    logger.info(`I open url ${url}`);
    return browser.get(url).catch((err) => {
        logger.error(`EROOR in : I open url ${url} - [${err}]`);
        return err;
    });
});

Then(/^The url is '([^']*)'$/, function (string) {
    logger.info(`The url is ${string}`);
    return browser.getCurrentUrl()
        .then((url) => expect(url).to.be.equal(string))
        .catch((err) => {
            logger.error(`EROOR in : The url is [${string}] - [${err}]`);
            return err;
        });
});

Then(/^I see the text '([^']*)', '([^']*)' at the header$/, function (singin, login) {
    header.getSigninText()
        .then((text) => expect(text).to.be.equal(singin));
    return header.getLoginText()
        .then((text) => expect(text).to.be.equal(login));
});

Then(/^the button with text '([^']*)'$/, function (button) {
    return header.getMainButtonText()
        .then((text) => expect(text).to.be.equal(button));
});

When(/^I choose country '([^']*)'$/, function (country) {
    return header.chooseLanguage(country);
});

When(/^I fill form for reason to buy '([^']*)' ticket from '([^']*)' to '([^']*)',out date '([^']*)', back date '([^']*)' for '([^']*)' passengers$/,
    function (ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
        return main.fillMainForm(ticket, from_airport, to_airport, fly_out, fly_back, passengers);
    });

Then(/^I see the page with next step with entered before data at the left side of the top of page in order:from '([^']*)' to '([^']*)' '([^']*)' '([^']*)'$/,
    function (from_airport, to_airport, ticket, passengers) {
        return browser.driver.sleep(3000)
            .then(() => browser.driver.getAllWindowHandles())
            .then((handlers) => browser.driver.switchTo().window(handlers[1]))
            .then(() => nextstep.getAirportsText())
            .then((text) => expect(text).to.be.equal(`${from_airport} to ${to_airport}`))
            .then(() => {
                if (passengers === 'default') {
                    return nextstep.getBreakpointText()
                        .then((text) => expect(text).to.be.equal(`${ticket} 1 Adult Change`))
                }
            });
    });