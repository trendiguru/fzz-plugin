/* globals TimeMe */

import ga_wrap from './ga_wrap';
import mp_wrap from './mp_wrap';
import amplitude_wrap from './amplitude_wrap';
import nginx, {buildQueryString} from './nginx_analytics';
import TrackAgent from './track-agent';
import {HOST_DOMAIN} from 'constants';
import 'ext/timeme';


export default class Analytics {

    constructor (client, sessionProps) {
        // console.debug({client, sessionProps});
        Object.assign(this, {
            sessionProps,
            inited: undefined,
            libs: {
                ga: ga_wrap,
                mp: mp_wrap,
                amplitude: amplitude_wrap,
                nginx
            }
        });
        this.loadAll();
        this[`${client}Init`]();
        this.trackAgent = new TrackAgent(this.libs);

    }

    loadAll () {
        for (let lib of Object.values(this.libs)) {
            lib.loaded = lib.load();
        }
    }

    initAll (clientID) {
        for (let a of Object.values(this.libs)) {
            if (a.inited === undefined) {
                a.inited = a.init(clientID);
            }
        }
    }

    appInit () {
        this.inited = Promise.resolve(this.sessionProps.fzz_id)
        .then(this.initAll.bind(this));
    }

    publisherInit () {
        this.getClientId();
        this.inited = Promise.resolve(this.fzz_id)
        .then(this.initAll.bind(this));
    }

    appendResultLink (result) {
        result.link = `http://links.trendi.guru/tr/web${result.redirection_path}?${buildQueryString('Result Clicked', this.sessionProps)}`;
        return result;
    }

    track (eventName, props = {}) {
        // console.debug({description: 'tracked', eventName, props, libs});
        let combinedProps = Object.assign({}, this.sessionProps, props);
        this.inited.then(this.trackAgent.track(eventName, combinedProps));
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
        let id = localStorage.getItem('infashion client id');
        if (!id) {
            id = Math.random().toString(36).substring(2);
            localStorage.setItem('infashion client id', id);
        }
        this.fzz_id = id;
        return id;
        // let a = this.libs.ga;
        // return a.loaded
        // .then(a.init)
        // .then(a.getClientId)
        // .then(clientId => {
        //     this.fzz_id = clientId;
        //     return clientId;
        // });
    }

}
