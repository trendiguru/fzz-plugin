const webdriver = require('selenium-webdriver'), 
{
    URLS,
    DRIVER_DECLARATION,
    VIEWPORT,
    WAIT_TIME,
    IFRAME_SELECTOR,
    RESULT_SELECTOR,
    INJECTED_SCRIPT,
    BUTTON_SELECTOR,
    LOADING_SELECTOR,
    BUTTON_CLASSNAME,
    SNIPPET,
} = require('./constants.js'),
BROWSER = DRIVER_DECLARATION.browsers[1],
By = webdriver.By,
until = webdriver.until,
driver = new webdriver.Builder().forBrowser(BROWSER).build();

driver.get(URLS.potential[0])
.then(null,(err)=>{
    errorReport(err, 'navigated to a url');
});

executeScript();

driver.wait(until.elementLocated(By.className('fzz-button')))
.then(null,(err)=>{
    errorReport(err, 'button located');
});

clickOnTgButton();

let iframe = driver.findElement(By.id('fazzi'));

driver.wait(until.elementIsVisible(iframe))
.then(null,(err)=>{
    errorReport(err, 'app');
});

driver.switchTo().frame(iframe).then(null,(err)=>{
    errorReport(err, 'swiched to iframe');
});

driver.quit();

function executeScript(){
    let script = driver.findElement(By.id(INJECTED_SCRIPT.ID))
    .then(()=>{
        console.log('the '+INJECTED_SCRIPT+' is already injected');
    },(err)=>{
        driver.executeScript(SNIPPET)
        .then(null,(err)=>{
            errorReport(err, 'injected script');
        });
        errorReport(err, 'GGGG');
    });
    
}


function errorReport(errObj, stage){
    console.log('at '+stage+' an error occurred:');
    console.log(errObj.message);
}

function clickOnTgButton(){
    let button = driver.findElement(By.className(BUTTON_CLASSNAME));
    if (BROWSER === 'firefox'){
        /* geckodriver (firefox 47+) does not support astions
        * see:https://github.com/mozilla/geckodriver/issues/159 
        */
        button.click();
    }else{
        driver.actions().mouseMove(button).click().perform();
    }
    driver.then(null,(err)=>{
        errorReport(err, 'button clicked');
    });
}