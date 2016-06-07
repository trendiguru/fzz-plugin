function delay(ms) {
    //console.log("Will wait...");
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default function poll(action, interval, max_intervals) {

    let retry = (tryNum, _resolve) => {
        return new Promise (resolve => {
            resolve = _resolve || resolve;
            if (tryNum < max_intervals) {
                action()
                .then(
                    result => resolve(result),
                    () => delay(interval).then(() => retry (++tryNum, resolve))
                );
            }
        });
    };

    return retry(0);

}

//Usage
// poll(() => getImageData(`www.one.com`), 1000, 10)
// .then((result) => console.log(`Result: ${result}`));
