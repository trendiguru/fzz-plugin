
const webdriver = require('selenium-webdriver'), 
{
    URLS,
    DRIVER_DECLARATION,
    RESULT_SELECTOR,
    INJECTED_SCRIPT,
    BUTTON_CLASSNAME,
    IFRAME_ID,
    SNIPPET,
} = require('./constants.js'),
BROWSER = DRIVER_DECLARATION.browsers[1],
By = webdriver.By,
until = webdriver.until,
driver = new webdriver.Builder().forBrowser(BROWSER).build();

//----flow----//
navigateTo(URLS.potential[3]);
executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
setDevData()//test: imitation of editing fzzDevReportData object.
getDevData()//test
waitForTgButton(BUTTON_CLASSNAME);
clickOnTgButton(BUTTON_CLASSNAME);
huntFzzIframe(IFRAME_ID);
driver.quit();
//------------//


function navigateTo(URL){
    driver.get(URL)
    .then(null,(err)=>{
        errorReport(err, 'navigated to a url');
    });
}

function executeFzzScript(scriptId, snippet){
    let script = driver.findElement(By.id(scriptId))
    .then(()=>{
        //on error:
        console.log('the '+scriptId+' is already injected');
    },(err)=>{
        driver.executeScript(snippet)
        .then(null,(err)=>{
            errorReport(err, 'injected script');
        });
    });
    
}

function waitForTgButton(className){
    driver.wait(until.elementLocated(By.className(className)))
    .then(null,(err)=>{
        errorReport(err, 'button located');
    });
}

function clickOnTgButton(className){
    let button = driver.findElement(By.className(className));
    if (BROWSER === 'firefox'){
       /* geckodriver (firefox 47+) does not support actions
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

function huntFzzIframe(id){
    let iframe = driver.findElement(By.id(id));
    driver.wait(until.elementIsVisible(iframe))
    .then(null,(err)=>{
        errorReport(err, 'app opened');
    });

    driver.switchTo().frame(iframe)
    .then(null,(err)=>{
        errorReport(err, 'swiched to iframe');
    });
}

function openResults(){
    ////*[@id="lightbox"]/div/nav - navigation xpath
    drive.wait(()=>{return 'done'}, 5000);
    let categories = driver.findElement(By.className('main'))
    .then(null,(err)=>{
        errorReport(err, 'get main container');
    });
    categories.
}

function errorReport(errObj, stage){
    console.log('at '+stage+' an error occurred:');
    console.log(errObj.message);
}

function getDevData(){
    let snippet = function(){
        return window.fzzDevReportData;
    };
    let test = driver.executeScript(snippet)
    .then((response)=>{
        console.log('fzzDevReportData:');
        console.log(response);
    },(err)=>{
        errorReport(err, 'injected script');
    });
}

function setDevData(){
    let snippet = function(){
        window.fzzDevReportData = {
            'description':'That is an object which collects an information about performance of fzz-scrip',
            'storage':{
                '1213afz':'msg1',
                '1213afz':'msg1',
            }
        };
        let test = driver.executeScript(snippet)
        .then((response)=>{
            console.log('fzzDevReportData:');
            console.log(response);
        },(err)=>{
            errorReport(err, 'injected script');
        });
    };
    let test = driver.executeScript(snippet)
    .then((response)=>{
        console.log('fzzDevReportData:');
        console.log(response);
    },(err)=>{
        errorReport(err, 'injected script');
    });
}