/**
 * ActionBuffer accumulate objects and by the time it reaches it's full copacity or enrich it's timeout a function is being applied on the accumulated object
 * @param {function}    action      - action to apply on the buffered elements
 * @param {number}      maxElements - maximum elements to buffer
 * @param {number}      timeout     - maximum time to accumulate
 */
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
    /**
     * Append element to buffer
     * @param {object} element - element to buffer
     */
    append (element) {
        this.buffered.push(element);
        if (this.accumulating) {
            this.accumulating = this.buffered.length < this.maxElements;
        }
        if (!this.accumulating) {
            this.act();
        }
    }
    /**
     * Add event listener
     * @param {string}   eventName  - Event to listen to
     * @param {function} callback   - Callback to apply on the event
     */
    on (event_name, callback) {
        this.listeners[event_name].push(callback);
    }
}
