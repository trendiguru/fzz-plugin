import {INFO_URL, IFRAME_ID} from 'constants';
import {analytics} from 'modules/analytics_wrapper';

export function round (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.classList.add('round');
}

export function roundDress (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.button.classList.add('round','dress');
}

export function roundAsos (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.button.classList.add('round','asos');
}

/**
 * Create the overlay div and the buttons within
 * @param   {object} tgImg TGImage object for which to draw, attach as its buttonDiv.
 * @returns {object} buttonDiv that was created and attached.
 */

function Overlay ([doc, tgImg]) {
    console.log('O_TGIMG: ');
    console.log(tgImg);

    let buttonDiv = tgImg.buttonDiv = doc.createElement('div');
    let button = buttonDiv.button   = doc.createElement('button');
    let info = buttonDiv.info       = doc.createElement('button');
    button.classList.add('fzzButton');
    info.classList.add('round', 'fzzInfo');
    buttonDiv.classList.add('fazz', 'fzz_overlay');
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(info);
    button.addEventListener('click', click.iframe.bind(tgImg));
    info.addEventListener('click', click.info);

    console.log('O_BUTTONDIV: ');
    console.log(buttonDiv);

    return buttonDiv;
}

let click = {
    iframe (e) {
        let iframe = document.getElementById(IFRAME_ID),
            imageURL = this.url;
        analytics.track('Trendi Button Clicked', {
            'imageURL': imageURL,
            'pageUrl': window.location.href
        });
        var msg_data = {};
        msg_data.imageURL = imageURL;
        iframe.contentWindow.postMessage(msg_data, '*');
        iframe.style.display = 'block';
        document.body.style.overflow = 'hidden';
        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    info (e){
        analytics.track('Info Button Clicked');

        window.open(INFO_URL, '_blank');

        e.preventDefault();
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
};
