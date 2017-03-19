const testLibs = require('./test-libs'),
localTestLibs = require('./local-test-libs'),
runCBTSession = require('./session-wrapper'),
SESSION_CONFIG = require('./session-config'),
saveReport = require('./modules/writer');

/** 
 * The difference between test-libs.js and local-test-libs.js is that 
 * functions of test-libs.js resceive already defined driver object and 
 * functions of local-test-libs.js contain inside the defined driver.
 * local-test-libs.js can use  test-libs.js's tests.
 * The main pupose of local-test-libs.js: 
 * test localy different selenium-webdriver's fitures before running the test. 
 */

let testsNum = 1;
// firefoxStylebookBug();
chromeReleaseTest()
// runCBTSession(testLibs.chromeReleaseTest, SESSION_CONFIG[2]);

function firefoxStylebookBug(){
    let report = {};
    let allSessionPromises = [];
    for(let i=0; i<testsNum; i++){
        console.log(i);
        let currentSessionPromise = localTestLibs.firefoxStylebookBug().then((reportObj)=>{
            report['session'+i] = reportObj;
        });
        allSessionPromises.push(currentSessionPromise);
    }
    Promise.all(allSessionPromises).then(()=>{
        saveReport(JSON.stringify(report));
    });
}

function chromeReleaseTest(){
    let report = {};
    let allSessionPromises = [];
    for(let i=0; i<testsNum; i++){
        console.log(i);
        let currentSessionPromise = localTestLibs.chromeReleaseTest().then((reportObj)=>{
            report['session'+i] = reportObj;
        });
        allSessionPromises.push(currentSessionPromise);
    }
    Promise.all(allSessionPromises).then(()=>{
        saveReport(JSON.stringify(report));
    });
}
// runCBTSession(testLibs.chromeReleaseTest, SESSION_CONFIG[2]);
// runCBTSession(testLibs.firefoxStylebookBug, SESSION_CONFIG[1]);