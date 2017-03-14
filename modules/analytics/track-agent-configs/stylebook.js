let defaultEventValidator = function(){
    let state = this.active;
    if (!this.multiple) {
        this.active = false;
    }
    return state;
};
export default {
    ga: {
        'Page Hit': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen Multiple': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        //this event is not influenced by track-agent config
        'Result Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Info Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Drawn': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Tutorial Closed': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'App Loaded': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'app opened': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Category Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Publisher Scroll': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Recieved Results': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
    },
    amplitude: {
        'Page Hit': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen Multiple': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        //this event is not influenced by track-agent config
        'Result Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Info Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Drawn': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Tutorial Closed': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'App Loaded': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'app opened': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Category Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Publisher Scroll': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Recieved Results': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
    },
    mp: {
        'Page Hit': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen Multiple': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Button Seen': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        //this event is not influenced by track-agent config
        'Result Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Info Button Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Trendi Button Drawn': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Tutorial Closed': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'App Loaded': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'app opened': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Category Clicked': {
            multiple: true,
            active: true,
            valid: defaultEventValidator,
        },
        'Publisher Scroll': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Recieved Results': {
            multiple: false,
            active: true,
            valid: defaultEventValidator,
        },
    },
    nginx: {
        'Page Hit': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'Button Seen Multiple': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'Button Seen': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'Trendi Button Clicked': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        //this event is not influenced by track-agent config
        'Result Clicked': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Info Button Clicked': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Trendi Button Drawn': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Tutorial Closed': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'App Loaded': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
        'app opened': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Category Clicked': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Publisher Scroll': {//closed//
            multiple: true,
            active: false,
            valid: defaultEventValidator,
        },
        'Recieved Results': {//closed//
            multiple: false,
            active: false,
            valid: defaultEventValidator,
        },
    }
}