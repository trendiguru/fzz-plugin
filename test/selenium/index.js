const testLibs = require('./test-libs'),
localTestLibs = require('./local-test-libs'),
runCBTSession = require('./session-wrapper'),
SESSION_CONFIG = require('./session-config');

/** 
 * The difference between test-libs.js and local-test-libs.js is that 
 * functions of test-libs.js resceive already defined driver object and 
 * functions of local-test-libs.js contain inside the defined driver.
 * local-test-libs.js can use  test-libs.js's tests.
 * The main pupose of local-test-libs.js: 
 * test localy different selenium-webdriver's fitures before running the test. 
 */

// runCBTSession(testLibs.chromeReleaseTest, SESSION_CONFIG[2]);
localTestLibs.firefoxStylebookBug();
// runCBTSession(testLibs.firefoxStylebookBug, SESSION_CONFIG[1]);