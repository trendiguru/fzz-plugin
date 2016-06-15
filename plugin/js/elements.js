import {IFRAME_ID, IFRAME_SRC, CSS_URL, PID} from 'constants';
import {Query} from 'modules/utils';

let iframe = new iFrame(),
    style = new Style();

export {iframe, style};

function iFrame (src) {
    let iframe = document.createElement('iframe');
    Object.assign(iframe, {
        id: IFRAME_ID,
        src: (src || IFRAME_SRC) + Query.stringify({PID}),
        show () {
            iframe.style.display = 'block';
            document.body.style.overflow = 'hidden';
        },
        hide () {
            document.getElementById(IFRAME_ID).style.display = 'none';
            document.body.style.overflow = 'visible';
        }
    });
    iframe.setAttribute('style','z-index: 10000000000; width: 100%; height: 100vh; position: fixed; top: 0; left: 0; margin: 0; border: 0; padding: 0; display: none;');
    return iframe;
}

function Style () {
    let link = document.createElement('link');
    Object.assign(link, {
        rel: 'stylesheet',
        type: 'text/css',
        href: CSS_URL
    });
    return link;
}
