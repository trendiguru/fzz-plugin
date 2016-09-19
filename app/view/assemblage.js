export default class Assemblage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            src: [],
            done: Array(this.props.src.length).fill(false)
        };
    }
    static get propTypes () {
        return {
            src: React.PropTypes.array,
            minWidth: React.PropTypes.number,
            margin: React.PropTypes.number,
            marginBottom: React.PropTypes.number,
            template: React.PropTypes.func
        };
    }
    loadImage (origin, i) {
        return new Promise ((resolve, reject) => {
            let img = Object.assign(new Image(), origin);
            img.onload = () => {
                this.setState(state => Object.assign({}, state, {
                    src: state.src.concat(img),
                    done: Object.assign({}, state.done, {
                        [i]: true
                    })
                }));
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
            dispatchEvent(done);
        });
        addEventListener('resize', this.forceUpdate.bind(this, null));
    }
    get width () {
        if (this.refs.root) {
            return this.refs.root.clientWidth;
        }
        else {
            return 1;
        }
    }
    render () {
        let {state: {src}, props: {template, margin, minWidth, marginBottom = margin}} = this;
        let ImageNodes = [];
        let col = Math.floor(this.width / minWidth) || 1;
        let width = this.width / col;
        let indexed = Array(Math.ceil(src.length / col)).fill(0).map(() => []);
        for (let i = 0; i < src.length; i++) {
            let img = src[i],
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
                >{template(img)}</div>;
        }
        return <div ref="root" className="assemblage" style={{position: 'relative'}}>{ImageNodes}</div>;
    }
}
