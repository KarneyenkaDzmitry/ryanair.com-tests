'use strict';

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

    fillMainForm(ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
        if (ticket === 'Return') {
            return this.returnTicket.click()
                .then(() => this.fromAirport.clear())
                .then(() => this.fromAirport.sendKeys(from_airport))
                .then(() => this.toAirport.sendKeys(to_airport))
                .then(() => this.toAirport.sendKeys(protractor.Key.ENTER))
                .then(() => this.fillFlyOutDate(fly_out))
                .then(() => this.fillFlyBackDate(fly_back))
                .then(() => browser.wait(ec.elementToBeClickable(this.mainButton)), 5000)
                .then(() => {
                    if (passengers === 'default') { this.mainButton.click(); }
                });

        } else {
            return this.oneWayTicket.click()
            .then(() => this.fromAirport.clear())
            .then(() => this.fromAirport.sendKeys(from_airport))
            .then(() => this.toAirport.sendKeys(to_airport))
            .then(() => this.toAirport.sendKeys(protractor.Key.ENTER))
            // .then(() => browser.driver.sleep(5000))
            .then(() => this.fillFlyOutDate(fly_out))
            // .then(() => this.fillFlyBackDate(fly_back))
            .then(() => {
                if (passengers === 'default') { this.mainButton.click(); }
            });
        }
    }

    fillFlyOutDate(fly_out) {
        const date =JSON.parse(fly_out).date;
        return $$('input[class*=date-input][aria-label*="Fly out:"]').map((elem, ind)=>{
            return elem.clear().then(()=>elem.sendKeys(date[ind]))});
    }
    
    fillFlyBackDate(fly_back) {
        const date =JSON.parse(fly_back).date;
        return $$('input[class*=date-input][aria-label*="Fly back:"]').map((elem, ind)=>{
            return elem.clear().then(()=>elem.sendKeys(date[ind]))});
    }
}

module.exports = new FlightsService();

