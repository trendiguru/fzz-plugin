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
until = webdriver.until;

//driver.manage().timeouts().pageLoadTimeout(WAIT_TIMEOUT);
// driver.manage().timeouts().setScriptTimeout(WAIT_TIMEOUT);
// driver.manage().window().maximize();
// driver.manage().deleteAllCookies();
// driver.manage().logs();

function buttonShownTest(driver) {
    let browserName = 'chrome'//driver.getCapabilites('browserName');//driver.getCapabilities().getBrowserName().toLowerCase();
    // console.log(browserName);
    let test = new AutoTest(driver, browserName, WAIT_TIME, WAIT_TIMEOUT);
    test.navigateTo(URLS.potential[3]);
    // test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
    // test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);  
    driver.quit();  
}

function releaseTest(driver){
    let test = new AutoTest(driver, BROWSER, WAIT_TIME, WAIT_TIMEOUT);
    test.navigateTo(URLS.potential[3]);
    test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
    test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);
    test.clickOn('.'+BUTTON_CLASSNAME, 'button clicked');
    test.huntFzzIframe(IFRAME_ID, WAIT_TIMEOUT);
    // test.checkResults();
    driver.wait(until.elementLocated(By.css('#lightbox > div > div > section:nth-child(1) > div > div:nth-child(1) > a > img')),WAIT_TIMEOUT);
    test.clickOn('#close');
    test.pause(WAIT_TIME);
    test.checkIfIframeClosed(IFRAME_ID);
    driver.quit();
}
module.exports = {buttonShownTest, releaseTest};



