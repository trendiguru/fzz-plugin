let Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);
let {
    INJECTED_SCRIPT
} = require('./../constants.js');

const URL_REGEXP = new RegExp('^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)');

Nightmare.action('customInject', function(done) {
    this.wait("body").evaluate_now(function(insc) {
        console.log(insc);
        var s = document.createElement('script');
        s.setAttribute('id', insc.ID);
        s.setAttribute('data-pid', insc.PID);
        s.setAttribute('data-api', insc.API);
        console.log(s);
        console.log(document.head);
        s.src = insc.SRC;
        var head = document.head || document.getElementsByTagName('head')[0]; // IE
        head.appendChild(s);

    }, done, INJECTED_SCRIPT)
});
