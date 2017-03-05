
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
BROWSER = DRIVER_DECLARATION.browsers[1],
By = webdriver.By,
until = webdriver.until,
driver = new webdriver.Builder().forBrowser(BROWSER).build();
// driver.manage().timeouts().implicitlyWait(10000);
driver.manage().timeouts().pageLoadTimeout(WAIT_TIMEOUT);
driver.manage().timeouts().setScriptTimeout(WAIT_TIMEOUT);

//----flow----//

let test = new AutoTest(driver, BROWSER, WAIT_TIME, WAIT_TIMEOUT);
test.navigateTo(URLS.potential[3]);
test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
test.setDevData()//test: imitation of editing fzzDevReportData object.
test.getDevData()//test
test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);
test.clickOn(BUTTON_CLASSNAME, 'button clicked');
test.huntFzzIframe(IFRAME_ID, WAIT_TIMEOUT);
test.checkResults();
test.checkIfIframeClosed();
driver.quit();
//------------//

