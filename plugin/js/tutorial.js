import Cookies from 'js-cookie';
import {TUTORIAL_VERSION} from 'constants';

/*
------------------------------------------
| Click the pink button!     | GOT IT |  |
------------------------------------------
*/

export function bar () {
    let onScroll = () => {
        if (getVisibleOverlay()) {
            removeEventListener('scroll', onScroll);
            tutorial.classList.remove('closed');
        }
    };
    addEventListener('scroll', onScroll);
    let tutorial = new Tutorial ();
    tutorial.content.appendChild(document.createTextNode('click the pink button'));
    tutorial.closeButton.appendChild(document.createTextNode('GOT IT'));
    tutorial.classList.add('bar', 'closed');
    return tutorial;
}

/*
------------------------------------------
| Try clicking the button!               |
|                                        |x
|              ╭  ╮                      |
|              ╰  ╯                      |
|                                        |
------------------------------------------
*/

// export function sample () {
//     let tutorial = new Tutorial ();
//     tutorial.content.appendChild(document.createTextNode('YOU HAVE TO CLICK THE BUTTON'));
//     return tutorial;
// }

/*
------------------------------
| Here is a button, click it  |   ╭  ╮
|_______________________________> ╰  ╯
*/

// let {body} = document;
//
// export function highlight () {
//     let tutorial = new Tutorial ();
//     tutorial.classList.add('highlight');
//     body.classList.add('fzz_lock');
//     tutorial.onClose = () => {
//         body.classList.remove('fzz_lock');
//     };
//     addEventListener('scroll', onScroll);
//     return tutorial;
// }

function Tutorial () {
    let tutorial = Object.assign(document.createElement('div'), {
        opened: Date.now(),
        className: 'tutorial',
        close () {
            let e = CustomEvent('tutorial closed');
            e.closed_after = Date.now() - this.opened;
            dispatchEvent(e);
            this.remove();
            if (this.onClose) {
                this.onClose();
            }
        },
        shadow: Object.assign(document.createElement('div'), {
            className: 'shadow',
            onclick () {
                tutorial.close();
            }
        }),
        content: Object.assign(document.createElement('div'), {
            className: 'content'
        }),
        closeButton: Object.assign(document.createElement('button'), {
            className: 'fzz_close',
            onclick () {
                tutorial.classList.add('closed');
                setTimeout(tutorial.close.bind(tutorial), 1000);
            }
        })
    });
    tutorial.appendChild(tutorial.shadow);
    tutorial.appendChild(tutorial.content);
    tutorial.content.appendChild(tutorial.closeButton);
    Cookies.set('fzz_tutorial_version', TUTORIAL_VERSION);
    return tutorial;
}

function getVisibleOverlay () {
    let buttons = Array.from(document.querySelectorAll('.fzzButton'));
    if (buttons.length) {
        for (let button of buttons) {
            if (weakVisible(button)) {
                return button.parentElement.parentElement;
            }
        }
    }
    return null;
}

function weakVisible (el) {
    let {width, height, top, left} = el.getBoundingClientRect();
    let points = [
        [left + width / 2, top + height / 2], // center
        [left + 1, top + 1], // left top corenr
        [left + width - 1, top + 1], // left bottom corenr
        [left + width - 1, top + 1], // right top corner
        [left + width - 1, top + height - 1] // right bottom corner
    ];
    let elements = points.map(point => document.elementFromPoint(...point));
    return elements.includes(el);
}
