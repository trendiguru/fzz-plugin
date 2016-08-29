export default class FzzDataAttributes {
    constructor () {
        Object.assign(this, {
            pid: 'dev',
            api: 'pd',
            whitelist: '*'
        });
        if (document.currentScript) {
            for (let attribute of Array.from(document.currentScript.attributes)) {
                if (attribute.name.search('data-') == 0) {
                    this[attribute.name.substr(5)] = attribute.value;
                }
            }
        }
    }
}
