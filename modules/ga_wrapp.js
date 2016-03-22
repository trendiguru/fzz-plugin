import runGASnippet from 'ext/ga-snippet';
import {GA_CODE} from 'constants';

export default {
	load: () => {
		new Promise((resolve, reject) => {
                logList.push("start _isLoaded function");
                runGASnippet();
                ga(resolve);
        	});
	},
    init: (cliendId) => {
    	new Promise((resolve,reject) => {
                if (clientId){
                	ga('create', GA_CODE, {
                    	name: this.identifier,
                    	clientId: clientId
                	});
                else {
                	ga('create', GA_CODE, {
                    name: this.identifier,
                	});
                }
                ga(resolve);
        });
    },
 	track: (eventName, properties) => {
            this.logList.push("start track function");
            let evCat = 'ALL';
            let evAct = eventName;
            let evLabel = '';
            ga(this.identifier+'.send', {
                hitType: 'event',
                eventCategory: evCat,
                eventAction: evAct,
                eventLabel: evLabel
        });
    }   	
};
