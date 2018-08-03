'use strict';
const { When, Then, Given, setDefaultTimeout } = require('cucumber');
const { logger } = require('../../configs/logger.conf');
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');
const main = require('../../page-objects/main.page');
const nextstep = require('../../page-objects/nextstep.page');
setDefaultTimeout(20 * 5000);

Given(/^I open url '([^']*)'$/, (url) => {
    logger.info(`I open url ${url}`);
    return browser.get(url);
});

Then(/^The expected url is '([^']*)'$/, (string) => {
    logger.info(`The expected url is ${string}`);
    return browser.getCurrentUrl()
        .then((url) => expect(url).to.be.equal(string));
});

Then(/^I see the text '([^']*)', '([^']*)' at the header$/, (singin, login) => {
    logger.info(`I see the text [${singin}], [${login}] at the header`);
    header.getSigninText()
        .then((text) => expect(text).to.be.equal(singin));
    return header.getLoginText()
        .then((text) => expect(text).to.be.equal(login));
});

Then(/^the button with text '([^']*)'$/, (button) => {
    logger.info(`the button with text  [${button}]`);
    return header.getMainButtonText()
        .then((text) => expect(text).to.be.equal(button));
});

When(/^I choose country '([^']*)'$/, (country) => {
    logger.info(`I choose country [${country}]`);
    return header.chooseLanguage(country);
});

When(/^I fill form for reason to buy '([^']*)' ticket from '([^']*)' to '([^']*)',out date '([^']*)', back date '([^']*)' for '([^']*)' passengers$/,
    (ticket, fromAirport, toAirport, flyOut, flyBack, passengers) => {
        logger.info(`I fill form with [${ticket}] [${fromAirport}] [${toAirport}] [${flyOut}] [${flyBack}] [${passengers}] passengers`);
        return main.fillMainForm(ticket, fromAirport, toAirport, flyOut, flyBack, passengers);
    });

Then(/^I see the page with next step with entered before data at the left side of the top of page in order:from '([^']*)' to '([^']*)' '([^']*)' '([^']*)'$/,
    (fromAirport, toAirport, ticket, passengers) => {
        logger.info(`I see the page with text: from [${fromAirport}] to [${toAirport}] [${ticket}] [${passengers}]`);
        return browser.driver.sleep(3000)
            .then(() => browser.driver.getAllWindowHandles())
            .then((handlers) => browser.driver.switchTo().window(handlers[1]))
            .then(() => nextstep.getAirportsText())
            .then((text) => expect(text).to.be.equal(`${fromAirport} to ${toAirport}`))
            .then(() => {
                if (passengers === 'default') {
                    return nextstep.getBreakpointText()
                        .then((text) => expect(text).to.be.equal(`${ticket} 1 Adult Change`));
                } else {
                    return 'underfine';
                }
            });
    });