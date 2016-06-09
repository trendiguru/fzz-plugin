/* globals React */

const {Component} = React;

class Assemblage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            src: [],
            done: Array(this.props.src.length).fill(false)
        };
    }
    loadImage (origin, i) {
        return new Promise ((resolve, reject) => {
            let img = Object.assign(new Image(), origin);
            img.onload = () => {
                this.setState(state => {
                    state.src.push(img);
                    state.done[i] = true;
                    return state;
                });
                resolve(img);
            };
            img.onerror = reject;
        });
    }
    loadImages (src) {
        var result = Promise.resolve();
        for (let i = 0; i < src.length; i++)
            result = result.then(this.loadImage.bind(this, src[i], i));
        return result;
    }
    componentDidMount () {
        this.loadImages(this.props.src).then(() => {
            let done = new Event('done', {bubbles: true});
            done.info = {loaded: this.state.done};
            this.refs.root.dispatchEvent(done);
        });
        addEventListener('resize', this.forceUpdate.bind(this, null));
    }
    render () {
        let ImageNodes = [];
        try {
            let {clientWidth} = this.refs.root,
                col = Math.floor(clientWidth / this.props.minWidth),
                width = clientWidth / col,
                {src} = this.state,
                {margin} = this.props,
                marginBottom = this.props.marginBottom || margin,
                indexed = Array(Math.ceil(src.length / col)).fill(0).map(() => []);
            for (let i = 0; i < src.length; i++) {
                let img = this.state.src[i],
                    row = (i - i % col) / col,
                    index = i % col;
                Object.assign(img, {
                    proportion: img.height / img.width,
                    top: 0
                });
                if (row) {
                    img.top += indexed[row - 1][index].proportion;
                    if (row - 1) {
                        img.top += indexed[row - 1][index].top;
                    }
                }
                indexed[row][index] = img;
                ImageNodes[i] = <div
                        key={i}
                        style={{
                            width: width - margin,
                            top: width * img.top + marginBottom * row,
                            left: width * index + margin /  2,
                            position: 'absolute'
                        }}
                    >{this.props.template(img)}</div>;
            }
        } catch (e) {() => e;} // swallow the error as a check
        return <div ref="root" className="assemblage" style={{position: 'relative'}}>{ImageNodes}</div>;
    }
}

export default Assemblage;
