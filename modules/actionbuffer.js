export default class ActionBuffer {
    constructor (action, maxElements, timeout) {
        Object.assign(this, {
            action,
            maxElements,
            timeout,
            accumulating: true,
            buffered: [],
            listeners: {
                fulfill: [],
                error: []
            }
        });
        setTimeout(() => {
            if (this.accumulating) {
                this.accumulating = false;
                this.act();
            }
        }, timeout);
    }
    act () {
        Promise.resolve(this.action(this.buffered))
        .then(res => {
            for (let callback of this.listeners.fulfill) {
                callback(res);
            }
        })
        .catch(err => {
            for (let callback of this.listeners.error) {
                callback(err);
            }
        });
    }
    append (element) {
        this.buffered.push(element);
        if (this.accumulating) {
            this.accumulating = this.buffered.length < this.maxElements;
        }
        if (!this.accumulating) {
            this.act();
        }
    }
    on (event_name, callback) {
        this.listeners[event_name].push(callback);
    }
}
