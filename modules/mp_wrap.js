import runMixpanelSnippet from 'ext/mixpanel-snippet';
import {LIBNAME, MIXPANEL_ID} from 'constants'


export default {
    load: function(){
        return new Promise(function (resolve, reject) {
            runMixpanelSnippet();
            mixpanel.init(MIXPANEL_ID, {
                loaded: function () {
                    resolve();
                }
            }, LIBNAME);
        });
    },
    init: function(clientId){
        return new Promise(function(resolve, reject){
            if(clientId !== undefined){
                mixpanel[LIBNAME].identify(clientId);
            }
            else{
                console.log('Mixpanel did not receive a client ID')
            }
            resolve();
        });
    }
    track: function (eventName, properties) {
            mixpanel[LIBNAME].track(eventName, properties);
        },
    init2: function (clientId) {
        return new Promise(function(resolve, reject){
            ga('create', GA_CODE, {
                name: 'fzz',
                clientId: clientId
            });
            ga(resolve);
        })
            
    }
};