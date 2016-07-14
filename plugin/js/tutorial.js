import Cookies from 'js-cookie';
import {TUTORIAL_VERSION} from 'constants';

export function bar () {
    let tutorial = new Tutorial ();
    tutorial.content.appendChild(document.createTextNode('click the pink button'));
    return tutorial;
}

export function sample () {
    let tutorial = new Tutorial ();
    tutorial.content.appendChild(document.createTextNode('YOU HAVE TO CLICK THE BUTTON'));
    return tutorial;
}

export function highlight () {
    let tutorial = new Tutorial ();
    tutorial.classList.add('highlight');
    tutorial.onClose = () => {
        document.body.classList.remove('fzz_lock');
    };
    let onScroll = () => {
        let fzzButton = document.querySelector('.fzzButton');
        if (!fzzButton) {
            return false;
        }
        else {
            let parent = fzzButton.parentElement,
                fzzButtonBoundingClientRect = fzzButton.getBoundingClientRect();
            tutorial.classList.add('show');
            document.body.classList.add('fzz_lock');
            document.body.appendChild(fzzButton);
            Object.assign(fzzButton.style, {
                top: fzzButtonBoundingClientRect.top + 'px',
                left: fzzButtonBoundingClientRect.left + 'px',
                position: 'fixed',
                zIndex: 1001
            });
            removeEventListener('scroll', onScroll);
        }
    };
    addEventListener('scroll', onScroll);
    return tutorial;
}

////////////////////////////////    //
//Click the pink button!            //
//////////////////////////////////////

function Tutorial () {
    let tutorial = Object.assign(document.createElement('div'), {
        opened: Date.now(),
        className: 'tutorial',
        close () {
            let e = new Event('tutorial closed');
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
            className: 'close',
            onclick () {
                tutorial.close();
            }
        })
    });
    tutorial.appendChild(tutorial.shadow);
    tutorial.appendChild(tutorial.content);
    tutorial.content.appendChild(tutorial.closeButton);
    Cookies.set('fzz_tutorial_version', TUTORIAL_VERSION);
    return tutorial;
}
