import {IFRAME_ID, IFRAME_SRC, CSS_URL} from 'constants';
import {Query} from 'modules/utils';

export function iFrame (props) {
    let iframe = document.createElement('iframe');
    Object.assign(iframe, {
        id: IFRAME_ID,
        src: `${(IFRAME_SRC)}?${Query.stringify(props)}`,
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

export function Style () {
    let link = document.createElement('link');
    Object.assign(link, {
        rel: 'stylesheet',
        type: 'text/css',
        href: CSS_URL
    });
    return link;
}

/**
 * @returns {Element} fzz-loading
 */
export function Loading () {
    let spinner = document.createElement('div');
    let wrapper = document.createElement('div');
    let rotator = document.createElement('div');
    spinner.className = 'fzz-loading';
    wrapper.className = 'fzz-loading__wrapper';
    rotator.className = 'fzz-loading__wrapper__rotator';
    spinner.appendChild(wrapper);
    wrapper.appendChild(rotator);
    rotator.appendChild(Object.assign(document.createElement('div'), {
        className: 'fzz-loading__wrapper__rotator__inner-spin'
    }));
    rotator.appendChild(Object.assign(document.createElement('div'), {
        className: 'fzz-loading__wrapper__rotator__inner-spin'
    }));
    return spinner;
}
