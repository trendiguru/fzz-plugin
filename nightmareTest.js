const Nightmare = require('nightmare');

const WAIT_TIME = 3500;
const RELEVANT_STACKS = ['smartCheckRelevancy', 'content'];
const RELEVANT_REQUESTS = [ 'Trendi Button Drawn', 'Trendi Button Clicked','Button Seen'];

/*Very important!!!
  1. nightmare test fails in case (1:we run an extension) AND (2:fzzPages list contains site/s that our pluging is installed on it/them).
  2. nightmare test checks only an extension perfomence AND not published code.
  3. if you want check 'Button seen' request you must set "show:true" attribute in nightmare object definition.
  */
let fzzPages = [
    'http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html',
    'http://www.gala.de/beauty-fashion/fashion/fashion-looks-der-style-von-jennifer-lawrence_1171061_782392-i9736316.html',
    //'http://amaze-magazine.com/2016/07/fall-street-style-dress-pant-dressing/',
    'http://www.stylebook.de/stars/Lena-Meyer-Landrut-ueberrascht-mit-neuer-Frisur_1-784989.html'
];

function checkPage (url) {
    let nightmare = new Nightmare({
        show: true,
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
        .wait(WAIT_TIME)
        .click('.fzzButton')
        .wait(WAIT_TIME)
        .click('#fazzi')
        .evaluate(() => window.devTools.STACKS.storage)
        .end()
        .then((stacks) => checkStacks(url, stacks))
        .catch((error) => {
            console.error('nightmare test failed:', error);
            return false;
        });
}

function checkStacks(pageName, stacks) {
    let result = true;
    for (let name of RELEVANT_STACKS) {
        console.log(`${name} stack contains: ${stacks[name].length} elements`);
        result = stacks[name].length !== 0 && result;
    }
    console.log(`____${pageName} check succeeded: ${result}____`);
    return (result && checkRequests(stacks.requests));
}

function checkRequests(requests){
    let result = true;
    for (let request of RELEVANT_REQUESTS) {
        console.log(`${request}: ${requests.includes(request)}`);
        result = requests.includes(request) && result;
    }
    console.log(`requests status: ${result}`);
    return result;
}

let promises = fzzPages.map((page) => checkPage(page, checkStacks));

Promise.all(promises)
.then((results) => {
    let flag = true;
    for (let result of results) {
        flag = (flag && result);
    }
    console.log(`_________TOTAL_RESULT_________${flag}`);
    return flag;
});
