import {HOST_DOMAIN} from 'constants';
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
        console.log("LOADIMAGE");
        console.log(origin);
        return new Promise ((resolve, reject) => {
            let img = Object.assign(new Image(), origin);
            let loaded = new Promise((resolve,reject)=>{
                    img.onload=resolve;
            });
            let timeOut = new Promise((resolve, reject)=>{
                setTimeout(()=>{img.src = HOST_DOMAIN+'/assets/img/bag.png';
                    resolve();
                }, 750);
            });
            Promise.race([loaded,timeOut
            ]).then(()=>{
                console.log("image is loaded: from loadImage");
                console.log(i);
                console.log(origin);
                this.setState(state => Object.assign({}, state, {
                    src: state.src.concat(img),
                    done: Object.assign({}, state.done, {
                        [i]: true
                    })
                }));
                resolve(img);
            });
            img.onerror = ()=>{
                console.log("image failed loaded: from loadImage");
                console.log(i);
                console.log(origin);
                img.src = HOST_DOMAIN+'/assets/img/bag.png';
                this.setState(state => Object.assign({}, state, {
                    src: state.src.concat(img),
                    done: Object.assign({}, state.done, {
                        [i]: true
                    })
                }));
                resolve(img);
            };;
        });
    }
    loadImages (src) {
        var result = Promise.resolve();
        console.log("loadImages");
        console.log(src);
        for (let i = 0; i < src.length; i++)
            try{
                result = result.then(this.loadImage.bind(this, src[i], i));
            }catch(err){
                console.log("FUUUUCK");
            }
        return result;
    }
    componentDidMount () {
        this.loadImages(this.props.src).then(() => {
            let done = CustomEvent('done', {bubbles: true});
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
        console.log("Assemblage WWWWWWW");
        console.log(this.state.src);
        let {state: {src}, props: {template, margin, minWidth, marginBottom = margin}} = this;
        let ImageNodes = [];
        let col = Math.floor(this.width / minWidth) || 1;
        let width = this.width / col;
        let indexed = Array(Math.ceil(src.length / col)).fill(0).map(() => []);
        for (let i = 0; i < src.length; i++) {
            try{
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
            }catch(err){
                console.log("hhhhhhh");
                console.log(err);
            }
        }
        return <div ref="root" className="assemblage" style={{position: 'relative'}}>{ImageNodes}</div>;
    }
}
