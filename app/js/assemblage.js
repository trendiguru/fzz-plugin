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
            img.onerror = () => reject();
            img.onload = () => {
                img.proportion = img.height / img.width;
                let images = this.state.images;
                images.push(img);
                this.setState({images: images});
                resolve();
            };
        });
    }
    componentDidMount () {
        function loadTwo (i) {
            if (this.props.src[i]) {
                let promises = [];
                if (this.props.src[i + 1])
                    promises.push(this.load(this.props.src[i + 1]));
                promises.push(this.load(this.props.src[i]));
                Promise.all(promises).then(loadTwo.bind(this, i + 2));
            }
        }
        loadTwo.call(this, 0);
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
                if (img.row - 1)
                    img.top += index[img.row - 2][img.pos].proportion;
            }
            index[img.row][img.pos] = img;
            img.width = document.body.clientWidth / this.props.col;
            return this.props.template(img);
        });
        return <div className="assemblage" style={{position: 'relative'}}>{images}</div>;
    }
}

export default Assemblage;