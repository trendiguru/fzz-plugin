const webdriver = require('selenium-webdriver'), 
By = webdriver.By,
until = webdriver.until,
getIframesElems  = function(){
    var NAV_SELECTOR = '#lightbox > div > nav > ul';
    var nav = window.document.querySelector(NAV_SELECTOR).children;
    var navTabs = [];
    //Array.from(nav).slice(0, -1);
    for(let i=0;i<nav.length-1; i++){
        navTabs.push(nav[i]);
    }
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
};


class AutoTest{
    constructor(driver, browserName, waitTime, waitTimeout){
        this.driver = driver;
        this.startWindow = driver.getWindowHandle();
        this.browserName = browserName;
        this.waitTime = waitTime;
        this.waitTimeout = waitTimeout;

        this.navigateTo = this.navigateTo.bind(this);
        this.executeFzzScript = this.executeFzzScript.bind(this);
        this.waitForTgButton = this.waitForTgButton.bind(this);
        this.clickOn = this.clickOn.bind(this);
        this.huntFzzIframe = this.huntFzzIframe.bind(this);
        this.checkResults = this.checkResults.bind(this);
        this.checkIfIframeClosed = this.checkIfIframeClosed.bind(this);
        this.getDevData = this.getDevData.bind(this);
        this.setDevData = this.setDevData.bind(this);
        this.pause = this.pause.bind(this);
        this._errorReport = this._errorReport.bind(this);
        this._pause = this._pause.bind(this);
        this._openResult = this._openResult.bind(this);
    }
    navigateTo(URL){
        this.driver.get(URL)
        .then(null,(err)=>{
            this._errorReport(err, 'navigated to a url');
        });
    }

    executeFzzScript(scriptId, snippet){
        let script = this.driver.findElement(By.id(scriptId))
        .then(()=>{
            console.log('the '+scriptId+' is already injected');
        },(err)=>{
            //on error:
            this.driver.executeScript(snippet)
            .then(null,(err)=>{
                this._errorReport(err, 'injected script');
            });
        });
        
    }

    waitForTgButton(className, waitTimeout){
        this.driver.wait(until.elementLocated(By.className(className)),waitTimeout)
        .then(null,(err)=>{
            this._errorReport(err, 'button located');
        });
    }

    /**
     * @param target - object <WebElement> which will be clicked,
     * or querySelector <string> - the selector of the object which will be clicked. 
     * @param stage - string which describes on which stage the function was performed. 
     */
    clickOn(target, stage){
        let button = null;
        if (typeof(target)==='string'){
            button = this.driver.findElement(By.css(target));
        }
        if (typeof(target)==='object'){
            button = target;
        }
        if (this.browserName === 'firefox'){
        /* geckodriver (firefox 47+) does not support actions
            * see:https://github.com/mozilla/geckodriver/issues/159 
            */
            button.click();
        }else{
            this.driver.actions().mouseMove(button).click().perform();
        }
        this.driver.then(null,(err)=>{
            this._errorReport(err, stage);
        });
    }

    huntFzzIframe(id, waitTimeout){
        let iframe = this.driver.findElement(By.id(id));
        this.driver.wait(until.elementIsVisible(iframe), waitTimeout)
        .then(null,(err)=>{
            this._errorReport(err, 'app opened');
        });

        this.driver.switchTo().frame(iframe)
        .then(null,(err)=>{
            this._errorReport(err, 'swiched to iframe');
        });
    }

    checkResults(){
        //wait for app to load:
        this.driver.wait(until.elementLocated(By.css('#lightbox > div > div > section:nth-child(1) > div > div:nth-child(1) > a > img')),this.waitTimeout);
        this.driver.wait(this._pause(this.waitTime),this.waitTimeout);
        this.driver.executeScript(getIframesElems)
        .then((data)=>{
            let navTabsNum = data.navigation.length;
            for (let i=0; i<navTabsNum; i++ ){
                this._openResult(data.navigation[i], data.sections[i]);
            }
            this.driver.wait(this._pause(this.waitTime),this.waitTimeout);
            this.clickOn(data.aside.close);
            this.driver.wait(this._pause(this.waitTime),this.waitTimeout);
        },(err)=>{
            this._errorReport(err, 'injected script');
        });
        this.driver.wait(this._pause(this.waitTime),this.waitTimeout);
    }

    checkIfIframeClosed(){
        //TODO: check how to swith between the tubs and check if the result was opened properly.
        //TODO: force quit when an error occurred.
        if (this.driver.getWindowHandle()!==this.startWindow){
            console.log("vvvv")
            this.driver.switchTo().window(this.startWindow);
        }
        let iframe = this.driver.findElement(By.id(IFRAME_ID))
        .then(null,(err)=>{
            this._errorReport(err, 'get fzzIframe second time.');
        });
        this.driver.executeScript(function(){
            return document.querySelector('#fazzi').style.display==='none';
        })
        .then((iframeIsInvisible)=>{
            if (!iframeIsInvisible){
                let err = {message: 'app is not closed'};
                this._errorReport(err, 'check if app was closed')
            }else{
                console.log('iframe was successfully closed');
            }
        },(err)=>{
            this._errorReport(err, 'check if app was closed');
        });
    }

    pause(time){
        this.driver.wait(this._pause(time));
    }

    /**
     * @param navTab - tab  <WebElement>.
     * @param result - result <WebElement>.
     */
    _openResult(navTab, result){
        this.clickOn(navTab);
        this.driver.wait(this._pause(this.waitTime/2),this.waitTimeout);
        this.clickOn(result);
        this.driver.wait(this._pause(this.waitTime/2),this.waitTimeout);
    }

    _errorReport(errObj, stage){
        console.log('***');
        console.log('at '+stage+' an ERROR occurred:');
        console.log(errObj.message);
        this.driver.quit();
    }

    _pause(interval){
        return this.driver.then(()=>{
            return new Promise((resolve, reject)=>{
                console.log('the system is paused for '+interval+' miliseconds');
                setTimeout(resolve, interval);
            });
        })
    }

    getDevData(){
        let snippet = function(){
            return window.fzzDevReportData;
        };
        let test = this.driver.executeScript(snippet)
        .then((response)=>{
            console.log('fzzDevReportData:');
            console.log(response);
        },(err)=>{
            this._errorReport(err, 'get dev data');
        });
    }

    /**
     * This function imitates the injection of data from fzzplugin into page.
     * That will help to treck fzzplugin performence while testing.
     */
    setDevData(){
        let snippet = function(){
            window.fzzDevReportData = {
                'description':'That is an object which collects an information about performance of fzz-scrip',
                'storage':{
                    '1213afz':'msg1',
                    '1213afz':'msg1',
                }
            };
        };
        let test = this.driver.executeScript(snippet)
        .then((response)=>{
            console.log('fzzDevReportData was injected to the window');
        },(err)=>{
            this._errorReport(err, 'set dev data');
        });
    }
}

module.exports = AutoTest;