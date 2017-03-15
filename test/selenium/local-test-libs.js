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


function chromeReleaseTest(){
    let browser = DRIVER_DECLARATION.browsers[1];
    var pref = new webdriver.logging.Preferences();
    pref.setLevel('browser', webdriver.logging.Level.ALL);
    let driver = new webdriver.Builder().forBrowser(browser).setLoggingPrefs(pref).build();
    driver.manage().timeouts().pageLoadTimeout(WAIT_TIMEOUT);
    driver.manage().timeouts().setScriptTimeout(WAIT_TIMEOUT);
    let test = new AutoTest(driver, browser, WAIT_TIME, WAIT_TIMEOUT);
    test.navigateTo(URLS.potential[3]);
    test.executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
    test.waitForTgButton(BUTTON_CLASSNAME, WAIT_TIMEOUT);
    test.clickOn('.'+BUTTON_CLASSNAME, 'button clicked');
    test.huntFzzIframe(IFRAME_ID, WAIT_TIMEOUT);
    test.checkResults();
    test.clickOn('#close');
    test.pause(WAIT_TIME);
    test.checkIfIframeClosed(IFRAME_ID);
    driver.manage().logs().get(webdriver.logging.Type.BROWSER)
     .then(function(entries) {
        entries.forEach(function(entry) {
          console.log('[%s] %s', entry.level.name, entry.message);
        });
     });
     driver.quit();
}

module.exports = {chromeReleaseTest};