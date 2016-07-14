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
