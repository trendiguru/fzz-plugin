const webdriver = require('selenium-webdriver'),
    AutoTest = require('./auto-test'),
    {
        URLS,
        DRIVER_DECLARATION,
        RESULT_SELECTOR,
        INJECTED_SCRIPT,
        BUTTON_CLASSNAME,
        IFRAME_ID,
        SNIPPET,
        WAIT_TIME,
        WAIT_TIMEOUT,
    } = require('./constants.js'),
    By = webdriver.By,
    until = webdriver.until,
    FIRST_RESULT_SELECTOR = '#lightbox > div > div > section:nth-child(1) > div > div:nth-child(1) > a > img';

function firefoxStylebookBug(driver) {
    return new Promise((resolve, reject)=>{
        let reportObj = {};
        let test = new AutoTest(driver, 'firefox', WAIT_TIME, WAIT_TIMEOUT);
        test.navigateTo(URLS.potential[3]);
        test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
        test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);
        test.clickOn('.' + BUTTON_CLASSNAME, 'button clicked');
        test.pause(WAIT_TIME);
        test.getDevData().then((data) => {
            console.log(data);
            reportObj['fromApp'] = data.storage;
        });
        test.huntFzzIframe(IFRAME_ID, WAIT_TIMEOUT);
        test.pause(WAIT_TIME);
        test.getDevData().then((data) => {
            console.log(data);
            reportObj['fromPublisher'] = data.storage;
        });
        driver.wait(until.elementLocated(By.css(FIRST_RESULT_SELECTOR)), WAIT_TIMEOUT);
        driver.then(() => {
            resolve(reportObj);
        });
    });
}

function chromeReleaseTest(driver) {
    return new Promise((resolve, reject)=>{
        let reportObj = {};
        let test = new AutoTest(driver, 'chrome', WAIT_TIME, WAIT_TIMEOUT);
        test.navigateTo(URLS.potential[3]);
        test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
        test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);
        test.clickOn('.' + BUTTON_CLASSNAME, 'button clicked');
        test.huntFzzIframe(IFRAME_ID, WAIT_TIMEOUT);
        test.checkResults();
        test.getDevData().then((data) => {
            console.log(data);
            reportObj['fromPublisher'] = data.storage;
        });
        test.clickOn('#close');
        test.pause(WAIT_TIME);
        test.checkIfIframeClosed(IFRAME_ID);
        driver.then(() => {
            resolve(reportObj);
        });
    });
}

module.exports = { chromeReleaseTest, firefoxStylebookBug };



