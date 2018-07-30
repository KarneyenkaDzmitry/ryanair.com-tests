'use strict';
const { When, Then, Given, setDefaultTimeout } = require('cucumber');
const { logger } = require('../../configs/logger.conf');
const { expect } = require('chai');
const header = require('../../page-objects/common/header.page');
const main = require('../../page-objects/main.page');
const nextstep = require('../../page-objects/nextstep.page');
setDefaultTimeout(20 * 5000);

Given(/^I open url '([^']*)'$/, function(url) {
    logger.info(`I open url ${url}`);
    return browser.get(url).catch((err) => {
        logger.error(`EROOR in : I open url ${url} - [${err}]`);
        return err;
    });
});

Then(/^The expected url is '([^']*)'$/, function(string) {
    logger.info(`The expected url is ${string}`);
    return browser.getCurrentUrl()
        .then((url) => expect(url).to.be.equal(string))
        .catch((err) => {
            logger.error(`ERROR in : The expected url is [${string}] - [${err}]`);
            return err;
        });
});

Then(/^I see the text '([^']*)', '([^']*)' at the header$/, function(singin, login) {
    logger.info(`I see the text [${singin}], [${login}] at the header`);
    header.getSigninText()
        .then((text) => expect(text).to.be.equal(singin));
    return header.getLoginText()
        .then((text) => expect(text).to.be.equal(login));
});

Then(/^the button with text '([^']*)'$/, function(button) {
    logger.info(`the button with text  [${button}]`);
    return header.getMainButtonText()
        .then((text) => expect(text).to.be.equal(button));
});

When(/^I choose country '([^']*)'$/, function(country) {
    logger.info(`I choose country [${country}]`);
    return header.chooseLanguage(country);
});

When(/^I fill form for reason to buy '([^']*)' ticket from '([^']*)' to '([^']*)',out date '([^']*)', back date '([^']*)' for '([^']*)' passengers$/,
    function(ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
        logger.info(`I fill form for reason to buy [${ticket}] ticket from [${from_airport}] to [${to_airport}],out date [${fly_out}], back date [${fly_back}] for [${passengers}] passengers`);
        return main.fillMainForm(ticket, from_airport, to_airport, fly_out, fly_back, passengers)
            .catch((error) => logger.error(`ERROR in : I fill form for reason to buy [${ticket}] ticket from [${from_airport}] to [${to_airport}],out date [${fly_out}], back date [${fly_back}] for [${passengers}] passengers`, error));
    });

Then(/^I see the page with next step with entered before data at the left side of the top of page in order:from '([^']*)' to '([^']*)' '([^']*)' '([^']*)'$/,
    function(from_airport, to_airport, ticket, passengers) {
        logger.info(`I see the page with next step with entered before data at the left side of the top of page in order:from [${from_airport}] to [${to_airport}] [${ticket}] [${passengers}]`);
        return browser.driver.sleep(3000)
            .then(() => browser.driver.getAllWindowHandles())
            .then((handlers) => browser.driver.switchTo().window(handlers[1]))
            .then(() => nextstep.getAirportsText())
            .then((text) => expect(text).to.be.equal(`${from_airport} to ${to_airport}`))
            .then(() => {
                if (passengers === 'default') {
                    return nextstep.getBreakpointText()
                        .then((text) => expect(text).to.be.equal(`${ticket} 1 Adult Change`));
                }
            })
            .catch((err) => {
                logger.error(`ERROR in : I see the page with next step with entered before data at the left side of the top of page in order:from - [${err}]`);
            });
    });