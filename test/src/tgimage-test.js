const expect = require('chai').expect; // jshint ignore:line
const ChromeConsole = require('./chrome-console');
const path = require('path');

const URL = 'http://image.gala.de/v1/cms/BZ/michelle-hunziker-aurora-familie_10704220-ORIGINAL-imageGallery_standard.jpg?v=14294014';
const PAGE = 'http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html';
const scriptStr = " window.result = new window.b_tgimage_test.default"

describe('tg-image test module', function() {
    describe('should return true is module has passed all test, otherwise - false', function(done) {
        this.timeout(50000);
        [createImg, createDiv, createWildImg].forEach(function(createObj) {
            tgImageTest(createObj);
        });
    });
});

function tgImageTest(createObj) {
    let snippet = createObj.toString() + scriptStr + "(" + createObj.name + "())";
    let modulePath = path.resolve(__dirname, 'b_tgimage_test.js');
    it('should return true if url of created TgImage object is the expected one, otherwise false', function(done) {
        let myConsole = new ChromeConsole(PAGE, modulePath);
        myConsole.run(snippet).then((res) => {
            console.log(res.url);
            console.log(res);
            try {
                expect(URL).to.equal(res.url);
                console.log("done");
                done();
            } catch (error) {
                console.log(error);
                done(error);
            }
        });
    });
}

function createImg() {
    let img = document.createElement('IMG');
    img.src = URL;
    return img;
}

function createDiv() {
    let div = document.createElement('div');
    div.style.backgroundImage = URL;
    return div;
}

function createWildImg() {
    let img = document.createElement('img');
    img.style.srcset = URL + ' 200w, ' + URL + ' 400w';
    return img;
}
