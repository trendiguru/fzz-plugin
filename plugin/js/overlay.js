export function round (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.classList.add('round');
    return overlay;
}

export function roundDress (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.classList.add('round','dress');
    return overlay;
}

export function roundAsos (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.classList.add('round','asos');
    return overlay;
}

export function recruit (tgImg) {
    let overlay = Overlay(tgImg);
    overlay.classList.add('round', 'recruit');
    return overlay;
}

const TILES = 3;

export function preview (tgImg) {
    let overlay = Overlay(tgImg),
        results = [],
        footer = document.createElement('div');
    overlay.classList.add('preview');
    footer.classList.add('footer');
    let plus = document.createElement('i');
    plus.appendChild(document.createTextNode('+'));
    overlay.button.appendChild(plus);
    // while there are lesss tiles than defined increase i and loop agian.
    for (let i = 0; results.length < TILES; i++) {
        for (let item of tgImg.data.items) {
            if (results.length < TILES) {
                results.push(item.similar_results[i]);
            }
        }
    }
    results.forEach(result => {
        let a = document.createElement('a');
        a.addEventListener('click', e => {
            block(e);
            window.open(result.link, '_blank');
        });
        a.style.backgroundImage = `url('${result.images.XLarge}')`;
        footer.appendChild(a);
    });
    footer.appendChild(overlay.button);
    footer.appendChild(overlay.info);
    overlay.appendChild(footer);
    return overlay;
}

/**
 * Create the overlay div and the buttons within
 * @param   {object} tgImg TGImage object for which to draw, attach as its buttonDiv.
 * @returns {object} buttonDiv that was created and attached.
 */

function Overlay (tgImg) {
    let buttonDiv = tgImg.buttonDiv = document.createElement('div');
    let button = buttonDiv.button   = document.createElement('button');
    let info = buttonDiv.info       = document.createElement('button');
    button.classList.add('fzzButton');
    info.classList.add('round', 'fzzInfo');
    buttonDiv.classList.add('fazz', 'fzz_overlay');
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(info);
    button.addEventListener('click', click.button.bind(tgImg));
    info.addEventListener('click', click.info);
    return buttonDiv;
}

let click = {
    button (e) {
        block(e);
        dispatchEvent(Object.assign(new Event ('button clicked'), this));
    },
    info (e) {
        block(e);
        dispatchEvent(new Event ('info button clicked'));
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
