'use strict';

class Header {

    constructor() {
        this.language = $('#markets');
        this.signin = $('*[ui-sref=register]');
        this.login = $('*[ui-sref=login]');
        this.mainButton = $('*[role=button][ng-show*=\'!\']');
    }

    getHeaderArray() {
        return $$('.username').map(elm => elm.getText());
    }

    chooseLanguage(country) {
        return this.language.click()
            .then(() => element(by.xpath(`//*[text()='${country} ']`)))
            .then((element) => element.click());
    }

    getMainButtonText() {
        return this.mainButton.getText();
    }

    getLoginText() {
        return this.getHeaderArray().then((array) => array[1]);
    }

    getSigninText() {
        return this.getHeaderArray().then((array) => array[0]);
    }
}

module.exports = new Header();