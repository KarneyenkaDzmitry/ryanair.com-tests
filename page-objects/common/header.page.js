'use strict';

class Header {
    constructor() {
        this.language = $('#markets');
        this.signin = $('*[ui-sref=register]');
        this.login = $('*[ui-sref=login]');
        this.mainButton = $('*[role=button]');
        this.headerArray = $$('.username').map(elm => {
                return elm.getText();
            });
    }

    chooseLanguage(country) {
        return this.language.click()
            .then(() => $$(`*[text()${country}]`))
            .then((element) => element.click());
    }

    getMainButtonText() {
        return this.mainButton.getText();
    }

    getLoginText() {
        return this.headerArray[1]
    }

    getSigninText() {
        return this.headerArray[0]
    }
}

module.exports = new Header();