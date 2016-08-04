const WAIT_TIME = 10000;

let RELEVANT_STACKS = ['smartCheckRelevancy', 'content'];
let fzzPages = ['http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html',
    'http://www.gala.de/beauty-fashion/fashion/fashion-looks-der-style-von-jennifer-lawrence_1171061_782392-i9736316.html',
    //'http://amaze-magazine.com/2016/07/fall-street-style-dress-pant-dressing/',
    'http://www.stylebook.de/stars/Lena-Meyer-Landrut-ueberrascht-mit-neuer-Frisur_1-784989.html'
];

var Nightmare = require('nightmare');
var checkPage = (url) => {
    var nightmare = new Nightmare({
        //show: true,
        openDevTools: true,
        switches: {
            'ignore-certificate-errors': true,
            'allow_displaying_insecure_content': true,
            'allow_running_insecure_content': true
        }
    });
    return nightmare.goto(url)
        .viewport(2000, 1000)
        .inject('js', 'b_plugin.js')
        .wait('.fzzButton')
        .click('.fzzButton')
        .wait(3000)
        .click('#fazzi')
        .evaluate(() => {
            return window.devTools.STACKS.storage;
        })
        .end()
        .then((stacks) => checkStacks(url, stacks))
        .catch((error) => {
            console.error('nightmare test failed:', error);
            return false;
        });
}

function checkStacks(pageName, stacks) {
    var result = true;
    RELEVANT_STACKS.forEach((name) => {
        console.log(name + " stack contains: " + stacks[name].length + " elements");
        result = stacks[name].length !== 0 && result;
    });
    console.log("____" + pageName + " check succeeded: " + result + "____");
    return result;
}

var promises = [];

fzzPages.map(function(page) {
    promises.push(Promise.resolve(checkPage(page, checkStacks)));
});

Promise.all(promises).then(function(results) {
    var flag = true;
    results.forEach(function(result) {
        flag = (flag && result);
    })
    console.log("_________TOTAL_RESULT_________: "+flag);
    return flag
});
