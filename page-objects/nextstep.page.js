'use strict';
class NextStep {
    constructor() {
        this.fromToText = $('.starting-point');
        this.breakpoint = $('.passenger-breakdown');
    }

    getAirportsText() {
        return this.fromToText.getText();
    }
    getBreakpointText() {
        return this.breakpoint.getText();
    }
}
module.exports = new NextStep();