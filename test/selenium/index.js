
const webdriver = require('selenium-webdriver'), 
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

//----flow----//
navigateTo(URLS.potential[3]);
executeFzzScript(INJECTED_SCRIPT.ID, SNIPPET);
setDevData()//test: imitation of editing fzzDevReportData object.
getDevData()//test
waitForTgButton(BUTTON_CLASSNAME);
clickOn(BUTTON_CLASSNAME, 'button clicked');
huntFzzIframe(IFRAME_ID);
checkResults();
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
        console.log('the '+scriptId+' is already injected');
    },(err)=>{
        //on error:
        driver.executeScript(snippet)
        .then(null,(err)=>{
            errorReport(err, 'injected script');
        });
    });
    
}

function waitForTgButton(className){
    driver.wait(until.elementLocated(By.className(className)),WAIT_TIMEOUT)
    .then(null,(err)=>{
        errorReport(err, 'button located');
    });
}

/**
 * @param target - object <WebElement> which will be clicked,
 * or className <string> - the className of the object which will be clicked. 
 * @param stage - string which describes on which stage the function was performed. 
 */
function clickOn(target, stage){
    let button = null;
    if (typeof(target)==='string'){
        button = driver.findElement(By.className(target));
    }
    if (typeof(target)==='object'){
        button = target;
    }
    if (BROWSER === 'firefox'){
       /* geckodriver (firefox 47+) does not support actions
        * see:https://github.com/mozilla/geckodriver/issues/159 
        */
        button.click();
    }else{
        driver.actions().mouseMove(button).click().perform();
    }
    driver.then(null,(err)=>{
        errorReport(err, stage);
    });
}

function huntFzzIframe(id){
    let iframe = driver.findElement(By.id(id));
    driver.wait(until.elementIsVisible(iframe), WAIT_TIMEOUT)
    .then(null,(err)=>{
        errorReport(err, 'app opened');
    });

    driver.switchTo().frame(iframe)
    .then(null,(err)=>{
        errorReport(err, 'swiched to iframe');
    });
}

function checkResults(){
    var snippet = function(){
        var NAV_SELECTOR = '#lightbox > div > nav > ul';
        var nav = window.document.querySelector(NAV_SELECTOR).children;
        var navTabs = Array.from(nav).slice(0, -1);//TODO: change ARRAY.from!!!!!!
        var results = [];
        var resIndex;
        var resSelector
        for (var i=0; i< navTabs.length; i++){
            resIndex = i+1;
            resSelector = '#lightbox > div > div > section:nth-child('+resIndex
            +') > div > div:nth-child(2) > a > img';
            results.push(window.document.querySelector(resSelector));
        }
        return {
            'navigation':navTabs,
            'sections':results,
            'aside':{
                close:window.document.querySelector('#close'),
                info:window.document.querySelector('#feedback'),
            }
        };
    }

    let openResult = function(navTab, result){
        clickOn(navTab);
        driver.wait(pause(WAIT_TIME/2),WAIT_TIMEOUT);
        clickOn(result);
        driver.wait(pause(WAIT_TIME/2),WAIT_TIMEOUT);
    }

    //wait for app to load:
    driver.wait(pause(WAIT_TIME),WAIT_TIMEOUT);
    let main = function(data){
        let navTabsNum = data.navigation.length;
        for (let i=0; i<navTabsNum; i++ ){
            openResult(data.navigation[i], data.sections[i]);
        }
    }
    
    driver.executeScript(snippet)
    .then((response)=>{
        console.log(response);
        main(response);
    },(err)=>{
        errorReport(err, 'injected script');
    });
    driver.wait(pause(WAIT_TIME),WAIT_TIMEOUT);
}

function errorReport(errObj, stage){
    console.log('at '+stage+' an error occurred:');
    console.log(errObj.message);
}

function pause(interval){
    return driver.then(()=>{
        return new Promise((resolve, reject)=>{
            console.log('the system is paused for '+interval+' miliseconds');
            setTimeout(resolve, interval);
        });
    })
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
        errorReport(err, 'get dev data');
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
    };
    let test = driver.executeScript(snippet)
    .then((response)=>{
        console.log('fzzDevReportData was injected to the window');
    },(err)=>{
        errorReport(err, 'set dev data');
    });
}