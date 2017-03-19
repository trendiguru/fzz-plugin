let fs = require('fs');
/**
 * write the data:
 * 'w' - Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
 * 'wx' - Like 'w' but fails if path exists.
 * 'w+' - Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
 * 'wx+' - Like 'w+' but fails if path exists.
 * 'a' - Open file for appending. The file is created if it does not exist.
 * 'ax' - Like 'a' but fails if path exists.
 * 'a+' - Open file for reading and appending. The file is created if it does not exist.
 * 'ax+' - Like 'a+' but fails if path exists.
 * ref: https://nodejs.org/docs/latest/api/fs.html 
 **/
const FLAG = 'wx';
const DEFAULT_FILE = 'report.txt';
const FILE_TYPE = 'json';
const PATH_TO_REPORT_DIR = './reports/';
const ALREADY_EXISTS_ERROR = 'File already exists.';
const SAVED_MSG = 'File was successfully saved.';
const CLOSED_MSG = 'File was successfully closed.';
const OPENED_MSG = 'File was successfully opened.';
const ERROR_CODE = 'EEXIST';

//If reports directory does not exist => create reports directory.
fs.access(PATH_TO_REPORT_DIR, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
  if (err.errno===-2){
      fs.mkdir(PATH_TO_REPORT_DIR)
  }
});

function saveReport(reportString) {
    let file = declareReport();
    return Promise.resolve()
        .then(() => openFile(file))
        .then((fileDescriptor) => writeToFile(reportString, fileDescriptor))
        .then(closeFile)
        .catch((err) => console.log(err));
}

function declareReport(){
    let date = new Date();
    let current_hour = date.getHours();
    return PATH_TO_REPORT_DIR+date+' '+current_hour+'.'+FILE_TYPE;
}

function openFile(file) {
    return new Promise((resolve, reject) => {
        let fileDescriptor = fs.open(file, FLAG, (err, fileDescriptor) => {
            if (err) {
                if (err.code === ERROR_CODE) {
                    console.error(ALREADY_EXISTS_ERROR);
                    return;
                } else {
                    throw err;
                }
            }
            console.log(OPENED_MSG);
            resolve(fileDescriptor);
        });
    });
}

function writeToFile(str, fileDescriptor) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileDescriptor, str, (err) => {
            if (err) {
                throw err;
            }else{
                console.log(SAVED_MSG);
                resolve(fileDescriptor);
            }
        });
    });
}

function closeFile(fileDescriptor){
    return new Promise((resolve, reject) => {
        fs.close(fileDescriptor,(err) => {
            if (err) {
                throw err;
            }else{
                console.log(CLOSED_MSG);
                resolve();
            }
        });
    });
}
module.exports = saveReport;