const defaultEventValidator = {
    valid: () => {
        let state = this.active;
        if (!this.multiple) {
            this.active = false;
        }
        return state;
    },
};
export default {'default': {
        ga: {
            'Page Hit': {
                multiple: false,
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
                multiple: true,
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
        },
        amplitude: {
            'Page Hit': {
                multiple: false,
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
                multiple: true,
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
        },
        mp: {
            'Page Hit': {
                multiple: false,
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
                multiple: true,
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
        },
        nginx: {
            'Page Hit': {//closed//
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
                multiple: true,
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
        },
    }
}