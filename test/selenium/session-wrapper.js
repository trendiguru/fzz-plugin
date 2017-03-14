let webdriver = require('selenium-webdriver');
let SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
let request = require('request');
let assert = require('selenium-webdriver/testing/assert');

function session(performTest, sessionConfig){
    //register general error handler
    console.log(sessionConfig.caps.username+" "+sessionConfig.caps.password);
    let sessionId = null;
    webdriver.promise.controlFlow().on('uncaughtException', webdriverErrorHandler);
    var driver = new webdriver.Builder()
        .usingServer(sessionConfig.remoteHub)
        .withCapabilities(sessionConfig.caps)
        .build();
    driver.getSession().then(function(session){
        sessionId = session.id_; //need for API calls
    });
    performTest(driver);
    //set the score as passing
    driver.call(setScore, null, 'pass');
    //Call API to set the score
    function setScore(score) {
        //webdriver has built-in promise to use
        var deferred = webdriver.promise.defer();
        var result = { error: false, message: null }
        if (sessionId){
            request({
                method: 'PUT',
                uri: 'https://crossbrowsertesting.com/api/v3/selenium/' + sessionId,
                body: {'action': 'set_score', 'score': score },
                json: true
            },
            function(error, response, body) {
                if (error) {
                    result.error = true;
                    result.message = error;
                }
                else if (response.statusCode !== 200){
                    result.error = true;
                    result.message = body;
                }
                else{
                    result.error = false;
                    result.message = 'success';
                }

                deferred.fulfill(result);
            })
            .auth(sessionConfig.caps.username, sessionConfig.caps.password);
        }
        else{
            result.error = true;
            result.message = 'Session Id was not defined';
            deferred.fulfill(result);
        }
        return deferred.promise;
    }

    //general error catching function
    function webdriverErrorHandler(err){

        console.error('There was an unhandled exception! ' + err);

        //if we had a session, end it and mark failed
        if (driver && sessionId){
            driver.quit();
            setScore('fail').then(function(result){
                console.log('set score to fail')
            })
        }
    }
}

module.exports = session;