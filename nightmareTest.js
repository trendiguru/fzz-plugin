const Nightmare = require('nightmare');
const readline = require('readline');

const WAIT_TIME = 3500;
const RELEVANT_STACKS = ['smartCheckRelevancy', 'content'];
const RELEVANT_REQUESTS = ['Trendi Button Drawn', 'Trendi Button Clicked', 'Button Seen'];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let injectedFile;
let fzzPages = {
    'publishers': [
        'http://amaze-magazine.com/2016/08/cute-fall-denim-everybody/',
        //'http://robshelter.blogspot.co.il/2015/09/forget.html',// Currently i do not knw what is the problem with this site&electron.
        'http://www.fashionseoul.com/?p=119333',
    ],
    'potencial': [
        'http://www.gala.de/stars/news/michelle-hunziker-die-schoensten-fotos-ihrer-familie_1166388-i10704220.html',
        'http://www.gala.de/beauty-fashion/fashion/fashion-looks-der-style-von-jennifer-lawrence_1171061_782392-i9736316.html',
        'http://www.stylebook.de/stars/Lena-Meyer-Landrut-ueberrascht-mit-neuer-Frisur_1-784989.html',
        'http://www.stylebistro.com/lookbook/Jessica+Alba/HMkKFqZGd_D'
    ]
};

/*Very important!!!
  1. nightmare test fails in case (1:we run an extension) AND (2:fzzPages list contains site/s that our pluging is installed on it/them).
  2. if you want check 'Button seen' request you must set "show:true" attribute in nightmare object definition.
  */

rl.question('To test published version of code enter: 0, \r\nTo test local version of code enter: 1\r\n', (answer) => {
    console.log('Please wait. It will take up to minute');

    rl.close();
    answer = answer || 1;
    subject = ['publishers', 'potencial'][answer]
    fzzPages = fzzPages[subject];
    injectedFile = {publishers:null, potencial: 'b_plugin.js'}[subject];
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
});

function checkPage(url) {
    let nightmare = new Nightmare({
        //show: true,
        openDevTools: true,
        switches: {
            'ignore-certificate-errors': true,
            'allow_displaying_insecure_content': true,
            'allow_running_insecure_content': true
        }
    });
    let nm = nightmare.goto(url);
    if (injectedFile) {
        nm = nm.inject('js', 'b_plugin.js');
    }
    nm = nm.viewport(2000, 1000)
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
    return nm;
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

function checkRequests(requests) {
    let result = true;
    for (let request of RELEVANT_REQUESTS) {
        console.log(`${request}: ${requests.includes(request)}`);
        result = requests.includes(request) && result;
    }
    console.log(`requests status: ${result}`);
    return result;
}
