'use strict';
const { logger } = require('../configs/logger.conf');

class FlightsService {
    constructor() {
        this.oneWayTicket = $('.lbl[id*=one-way]');
        this.returnTicket = $('.lbl[id*=return]');
        this.fromAirport = $('input[aria-labelledby*=-from]');
        this.toAirport = $('input[aria-labelledby*=-to]');
        this.flyOutDate = $('*[label=\'Fly out:\']');
        this.flyBackDate = $('*[label=\'Fly back:\']');
        this.mainButton = $('button[role=button][ng-show=extend]');
    }

    fillMainForm(ticket, fromAirport, toAirport, flyOut, flyBack, passengers) {
        if (ticket === 'Return') {
            return this.returnTicket.click()
                .then(() => this.fromAirport.clear())
                .then(() => this.fromAirport.sendKeys(fromAirport))
                .then(() => this.toAirport.sendKeys(toAirport))
                .then(() => this.toAirport.sendKeys(protractor.Key.ENTER))
                .then(() => this.fillFlyOutDate(flyOut))
                .then(() => this.fillFlyBackDate(flyBack))
                .then(() => browser.wait(ec.elementToBeClickable(this.mainButton)), 5000)
                .then(() => {
                    if (passengers === 'default') {
                        this.mainButton.click();
                    }
                })
                .catch((error) => logger.error(`ERROR in filling form. Data: [${ticket}, ${fromAirport}, ${toAirport}, ${flyOut}, ${flyBack}, ${passengers}]`, error));


        } else {
            return this.oneWayTicket.click()
                .then(() => this.fromAirport.clear())
                .then(() => this.fromAirport.sendKeys(fromAirport))
                .then(() => this.toAirport.sendKeys(toAirport))
                .then(() => this.toAirport.sendKeys(protractor.Key.ENTER))
                .then(() => browser.driver.sleep(5000))
                .then(() => this.fillFlyOutDate(flyOut))
                .then(() => this.fillFlyBackDate(flyBack))
                .then(() => {
                    if (passengers === 'default') {
                        this.mainButton.click();
                    }
                });
        }
    }

    fillFlyOutDate(flyOut) {
        const date = JSON.parse(flyOut).date;
        return $$('input[class*=date-input][aria-label*="Fly out:"]').map((elem, ind) => {
            return elem.clear().then(() => elem.sendKeys(date[ind]));
        });
    }

    fillFlyBackDate(flyBack) {
        const date = JSON.parse(flyBack).date;
        return $$('input[class*=date-input][aria-label*="Fly back:"]').map((elem, ind) => {
            return elem.clear().then(() => elem.sendKeys(date[ind]));
        });
    }
}

module.exports = new FlightsService();

