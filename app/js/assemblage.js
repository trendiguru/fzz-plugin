/* globals React */

class Assemblage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {images: []};
    }
    load (source) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            for (let key in source)
                img[key] = source[key];
            img.onerror = reject;
            img.onload = () => {
                img.proportion = img.height / img.width;
                let images = this.state.images;
                images.push(img);
                this.setState({images: images});
                resolve();
            };
        });
    }
    loadAll (i) {
        if (i < this.props.src.length)
            this.load(this.props.src[i]).then(() => this.loadAll(i + 1));
        else if (typeof this.props.onMount === 'function')
            this.props.onMount.call(this);
    }
    componentDidMount () {
        this.loadAll.call(this, 0);
    }
    render () {
        let index = [];
        for (let i = 0; i < this.props.src.length / this.props.col; i++)
            index.push([]);
        let images = this.state.images.map((img, i) => {
            img.pos = i % this.props.col;
            img.row = Math.floor(i / this.props.col);
            img.top = 0;
            if (img.row) {
                img.top += index[img.row - 1][img.pos].proportion;
                if (img.row - 1) {
                    img.top += index[img.row - 1][img.pos].top;
                }
            }
            index[img.row][img.pos] = img;
            img.width = document.body.clientWidth / this.props.col;
            return <div key={i} style={{width: img.width, left: img.width * img.pos, top: img.top * img.width, position: 'absolute'}}>{this.props.template(img)}</div>;
});
return <div className="assemblage" style={{position: 'relative'}}>{images}</div>;
}
}

export default Assemblage;