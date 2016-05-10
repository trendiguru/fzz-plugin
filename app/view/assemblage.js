/* globals React */

const {Component} = React;

class Assemblage extends Component {
    constructor (props) {
        super(props);
        let {col, src} = this.props,
            index = Array(Math.ceil(src.length / col)).fill(0).map(() => []);
        this.state = {src: [], index: index, done: Array(this.props.src.length).fill(false)};
    }
    loadImage (dictionary, i) {
        return new Promise ((resolve, reject) => {
            let img = new Image();
            for (let key in dictionary)
                img[key] = dictionary[key];
            img.onload = () => {
                let {col} = this.props;
                img.proportion = img.height / img.width;
                img.row = (i - i % col) / col;
                img.index = i % col;
                this.setState(state => {
                    state.src.push(img);
                    state.index[img.row].push(img);
                    state.done[i] = true;
                    return state;
                });
                resolve(img);
            };
            img.onerror = () => reject(img);
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
        let ImageNodes = this.state.src.map(
            img => {
                img.top = 0;
                if (img.row) {
                    img.top += this.state.index[img.row - 1][img.index].proportion;
                    if (img.row - 1) img.top += this.state.index[img.row - 1][img.index].top;
                }
                return img;
            }
        ),
            width = this.refs.root ? this.refs.root.clientWidth / this.props.col : 0;
        return <div ref="root" className="assemblage" style={{position: 'relative'}}>{
                ImageNodes.map((img, i) => <div key={i} style={{width: width - this.props.margin, height: width * img.proportion, top: width * img.top + this.props.margin * (img.row + 1), left: width * img.index + this.props.margin /  2, position: 'absolute'}}>{this.props.template(img)}</div>
                )}
        </div>;
    }
}

export default Assemblage;