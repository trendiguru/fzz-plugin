const webdriver = require('selenium-webdriver'),
AutoTest = require('./auto-test'),
testLibs = require('./test-libs'),
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
    //init driver
    let browser = DRIVER_DECLARATION.browsers[1];
    var pref = new webdriver.logging.Preferences();
    pref.setLevel('browser', webdriver.logging.Level.ALL);
    let driver = new webdriver.Builder().forBrowser(browser).setLoggingPrefs(pref).build();
    driver.manage().timeouts().pageLoadTimeout(WAIT_TIMEOUT*3);
    driver.manage().timeouts().setScriptTimeout(WAIT_TIMEOUT*3);
    //run tet
    testLibs.chromeReleaseTest(driver);
    //get inpect-logs
    driver.manage().logs().get(webdriver.logging.Type.BROWSER)
     .then(function(entries) {
        entries.forEach(function(entry) {
          console.log('[%s] %s', entry.level.name, entry.message);
        });
     });
     driver.quit();
}

function firefoxStylebookBug(){
    //init driver
    let browser = DRIVER_DECLARATION.browsers[0];
    let driver = new webdriver.Builder().forBrowser(browser).build();
    driver.manage().timeouts().pageLoadTimeout(3*WAIT_TIMEOUT);
    driver.manage().timeouts().setScriptTimeout(WAIT_TIMEOUT);
    //run test
    testLibs.firefoxStylebookBug(driver);
    //quit
    driver.quit();
}

module.exports = {chromeReleaseTest, firefoxStylebookBug};