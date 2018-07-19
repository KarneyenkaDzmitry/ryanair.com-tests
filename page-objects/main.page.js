'use strict';

class FlightsServise {
    constructor() {
        this.oneWayTicket=$('.lbl[id*=one-way]');
        this.returnTicket=$('.lbl[id*=return]');
        this.fromAirport=$('input[aria-labelledby*=-from]');
        this.toAirport=$('input[aria-labelledby*=-to]');
        this.flyOutDate=$('*[label=\'Fly out:\']');
        this.flyBackDate=$('*[label=\'Fly back:\']');
        this.mainButton = $('*[role=button][ng-show*=\'!\']');
    }

    fillMainForm(ticket, from_airport, to_airport, fly_out, fly_back, passengers) {
        if (ticket==='return'){
            this.returnTicket.click()
            .then(()=>this.fromAirport.sendKeys(from_airport))
            .then(()=>this.toAirport.sendKeys(to_airport))
            .then(()=>this.flyOutDate.sendKeys(fly_out))
            .then(()=>this.flyBackDate.sendKeys(fly_back))
            .then(()=>{
                if (passengers==='default')this.fromAirport.sendKeys(from_airport);
            });
            


        } else {

        }
    }
}