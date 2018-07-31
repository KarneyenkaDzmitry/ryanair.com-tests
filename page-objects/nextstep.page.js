'use strict';
class NextStep {
    constructor() {
        this.fromToText = $('h1 translate');
        this.breakpoint = $('.passenger-breakdown');
    }

    getAirportsText() {
        return browser.wait(ec.visibilityOf(this.fromToText))
        .then(()=>this.fromToText.getText());
    }
    getBreakpointText() {
        return this.breakpoint.getText();
    }
}
module.exports = new NextStep();