/* globals TimeMe */

import 'whatwg-fetch';
import ga_wrap from './ga_wrap';
import mp_wrap from './mp_wrap';
import nginx, {buildQueryString} from './nginx_analytics';
import {HOST_DOMAIN} from 'constants';
import {REQUESTS} from './devTools';
import timeme from 'ext/timeme';

REQUESTS.active = true;

export default class Analytics {

    constructor (client, sessionProps) {
        console.debug({client, sessionProps});

        Object.assign(this, {sessionProps}, {
            inited: undefined,
            libs: {
                ga: ga_wrap,
                mp: mp_wrap,
                nginx
            }
        });

        this.loadAll();

        this[`${client}Init`]();

    }

    loadAll () {
        for (let a of Object.values(this.libs)) {
            a.loaded = a.load();
        }
    }

    initAll (clientID) {
        Object.values(this.libs)
        .filter(a => !a.hasOwnProperty('inited'))
        .forEach(a => {
            a.inited = a.init(clientID);
        });
    }

    appInit () {
        this.inited = this.getClientId()
        .then(this.initAll.bind(this))
        .then(() => {
            console.debug(`Posted clientID: ${this.fzz_id}`);
            window.parent.postMessage({
                fzz_id: this.fzz_id
            }, '*');
        });

        // timeme();
        // window.onbeforeunload = () => fetch(`https://track.trendi.guru/tr/web?event=Page%20Unloaded&duration=${TimeMe.getTimeOnCurrentPageInSeconds()}&publisherDomain=${this.props.publisherDomain}`);
    }

    publisherInit () {
        this.inited = this.getClientId()
        .then(() => new Promise(resolve => addEventListener('message', function (msg) {
            if (msg.origin === HOST_DOMAIN) {
                if (msg.data !== undefined && msg.data.fzz_id) {
                    this.fzz_id = msg.data.fzz_id;
                    console.debug(`Got fzz_id: ${this.fzz_id}`);
                    resolve(this.fzz_id);
                }
            }
        }, false)))
        .then(this.initAll.bind(this));
    }

    appendResultLink (result) {
        result.link = `http://links.trendi.guru/tr/web${result.redirection_path}?${buildQueryString('Result Clicked', this.sessionProps)}`;
        return result;
    }

    track (eventName, props = {}, libs) {
        console.debug('tracked', eventName, props, libs);
        Object.assign(this, props);

        this.inited.then(() => {
            // Use all libs if not specified
            libs = libs || Object.keys(this.libs);
            Object.entries(this.libs)
            .forEach(([lib, analyticsObj]) => {
                if (libs.indexOf(lib) > -1) {
                    REQUESTS.set(props, 'property');
                    analyticsObj.inited.then(() => analyticsObj.track(eventName, props));
                }
            });
        });

    }

    listen (event) {
        switch (event) {
        case 'scroll': {
            //Track Scroll on Publisher
            let initScrollTop = window.scrollY;
            window.addEventListener('scroll', () => {
                if (window.scrollY - initScrollTop > 20) {
                    this.track('Publisher Scroll', undefined, ['ga']);
                    initScrollTop = 100000000;
                }
            });
            break;
        }
        }
    }

    getClientId () {
        let a = this.libs.ga;
        return a.loaded
        .then(a.init)
        .then(a.getClientId)
        .then(clientId => {
            this.fzz_id = clientId;
            return clientId;
        });
    }

}
