/* globals React */

class Assemblage extends React.Component {
    constructor (props) { // props = {src, x, col}
        super (props);
        this.state = {images: [], index: []};
        var images = [],
            processes = this.props.src.length;
        this.props.src.forEach((url, i) => {
            var image = document.createElement('img');
            image.src = url;
            image.onload = () => {
                images[i] = image;
                processes--;
                if (!processes) {
                    this.setState({images: images});
                    this.init();
                }
            };
        });
    }
    init () {
        var index = this.state.index;
        this.state.images.forEach((image, i) => {
            image.proportion = image.height / image.width;
            image.index = i;
            image.row = 0;
            while (image.index - this.props.col >= 0) {
                image.index -= this.props.col;
                image.row++;
            }
            if (index[image.row] == undefined)
                index[image.row] = [];
            index[image.row][image.index] = image;
        });
        this.setState({index: index});
    }
    render () {
        if (this.state.images.length)
            var images = this.state.images.map((image, i) => {
                var top = 0,
                    row = image.row,
                    width = this.props.x / this.props.col;
                while (row - 1 > 0) {
                    top += this.state.index[image.row - 1][image.index].proportion;
                    row--;
                }
                var style = {width: width, left: image.index * width, top: top * width, position: 'absolute'};
                return <img key={i} src={image.src} style={style} />;
            });
        return <div style={{position: 'relative'}}>{images}</div>;
    }
}

export default Assemblage;