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
    buttonDiv.className = ['fzz_overlay', 'fazz', ...classList].join(' ');
    // buttonDiv.classList.add('fzz_overlay', 'fazz', ...classList);
    button.classList.add('fzz-button');
    info.classList.add('round', 'fzz-info');
    buttonDiv.appendChild(button);
    buttonDiv.appendChild(info);
    button.addEventListener('click', click.button.bind(tgImg));
    info.addEventListener('click', click.info);
    return buttonDiv;
}

Overlay.extend = (extension) =>
    function ExtendedOverlay () {
        let buttonDiv = Overlay(...arguments);
        extension(buttonDiv);
        return buttonDiv;
    };

const Round = Overlay.extend(buttonDiv => {
    let halo = document.createElement('div');

    buttonDiv.classList.add('round');
    halo.classList.add('halo');

    for (let i = 0; i < 3; i++) {
        halo.appendChild(document.createElement('div'));
    }
    buttonDiv.appendChild(halo);
    if (!localStorage.getItem('infashion tutorial was shown')) {
        let tutorial = document.createElement('div');
        tutorial.classList.add('tutorial');
        tutorial.appendChild(document.createTextNode('Find similar clothes'));
        buttonDiv.appendChild(tutorial);
    }
});

if (!localStorage.getItem('infashion tutorial was shown')) {
    addEventListener('button clicked', () => {
        localStorage.setItem('infashion tutorial was shown', true);
        for (let tutoiral of Array.from(document.querySelectorAll('.fazz .tutorial'))) {
            tutoiral.remove();
        }
    });
}

export let round = (tgImg) => Round(tgImg);
export let roundDress = (tgImg) => Round(tgImg, ['dress']);
export let roundAsos = (tgImg) => Round(tgImg, ['asos']);
export let recruit = (tgImg) => Round(tgImg, ['recruit']);
export let stylebook = (tgImg) => Round(tgImg, ['stylebook']);

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

let click = {
    button (e) {
            block(e);
            if (this.firstResult){
            window.open(this.firstResult,'_blank');
            dispatchEvent(Object.assign(CustomEvent ('button clicked'), this));
        }
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
