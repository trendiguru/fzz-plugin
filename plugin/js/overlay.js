export let round = (tgImg) => new Overlay(tgImg, ['round']);
export let roundDress = (tgImg) => new Overlay(tgImg, ['round', 'dress']);
export let roundAsos = (tgImg) => new Overlay(tgImg, ['round', 'asos']);
export let recruit = (tgImg) => new Overlay(tgImg, ['round', 'recruit']);
export let stylebook = (tgImg) => new Overlay(tgImg, ['round', 'stylebook']);

const TILES = 3;

export function preview (tgImg) {
    let overlay = Overlay(tgImg, 'preview'),
        results = [],
        footer = document.createElement('div'),
        plus = document.createElement('i');
    // while there are lesss tiles than defined increase i and loop agian.
    for (let i = 0; results.length < TILES; i++) {
        for (let item of tgImg.data.items) {
            if (results.length < TILES) {
                results.push(item.similar_results[i]);
            }
        }
    }
    for (let result of results) {
        let a = document.createElement('a');
        a.addEventListener('click', e => {
            block(e);
            window.open(result.link, '_blank');
        });
        a.style.backgroundImage = `url('${result.images.XLarge}')`;
        footer.appendChild(a);
    }
    footer.classList.add('footer');
    overlay.appendChild(footer);
    footer.appendChild(overlay.button);
    footer.appendChild(overlay.info);
    overlay.button.appendChild(plus);
    plus.appendChild(document.createTextNode('+'));
    return overlay;
}

/**
 * Create the overlay div and the buttons within
 * @param   {object} tgImg TGImage object for which to draw, attach as its buttonDiv.
 * @returns {object} buttonDiv that was created and attached.
 */

function Overlay (tgImg, classList = []) {
    let buttonDiv = tgImg.buttonDiv = document.createElement('div');
    let button = buttonDiv.button = document.createElement('button');
    let info = buttonDiv.info = document.createElement('button');
    classList = Array.isArray(classList) ? classList : [classList];
    buttonDiv.classList.add('fzz_overlay', 'fazz', ...classList);
    button.classList.add('fzzButton');
    info.classList.add('round', 'fzzInfo');
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(info);
    button.addEventListener('click', click.button.bind(tgImg));
    info.addEventListener('click', click.info);
    return buttonDiv;
}

let click = {
    button (e) {
        block(e);
        dispatchEvent(Object.assign(CustomEvent ('button clicked'), this));
    },
    info (e) {
        block(e);
        dispatchEvent(CustomEvent ('info button clicked'));
    }
};

function block (e) {
    e.preventDefault();
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}
