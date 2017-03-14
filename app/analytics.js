import Analytics from 'modules/analytics/analytics_wrapper';
import {REQUESTS} from 'modules/devTools';
import {Query} from 'modules/utils';

REQUESTS.desktop = 0;

let analytics = new Analytics('app', Query.parse(location.search));

analytics.track('App Loaded');

addEventListener('app opened', () => {
    analytics.track('App Opened');
    REQUESTS.desktop +=1;
});

addEventListener('tab set', e => analytics.track('Category Clicked', {
    title: e.info.title
}));

addEventListener('result clicked', e => analytics.track('Result Clicked', {clickUrl: e.info.clickURL, imageURL: window.app.props.imageURL}));

export default analytics;

//publisherDomain = getLocation(document.referrer).hostname.replace('www.', '');
