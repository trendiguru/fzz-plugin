import {setAttributes} from 'modules/utils';
import {HOST_DOMAIN} from 'constants';

// const URL = `${HOST_DOMAIN}/fzz.min.js`;
// should output <script src="fzz.min.js" data-whitelist="*" data-pid="dev-roundDress"></script>

const URL = `${HOST_DOMAIN}/b_plugin.js`;

appendScript(URL).then(() => {
    let FZZ = window.FZZ = {logList: []};
    FZZ.log = (message) => window.FZZ.logList.push(message);
    FZZ.log(`TG Extension Done at: ${new Date()}`);
});

function appendScript(src) {
    return new Promise ((resolve) => {
        let script = setAttributes(document.createElement('script'), {
            'type': 'text/javascript',
            'class': 'fzz-script',
            src,
            'data-whitelist': '*',
            'data-pid': 'dev-roundDress',
            'data-api': 'ND',
            async: false
        });
        script.onload = resolve;
        script.onreadystatechange = () => {
            if (script.readyState == 'complete') {
                resolve();
            }
        };
        document.documentElement.appendChild(script);
        console.info('Script Tag', script);
    });
}
