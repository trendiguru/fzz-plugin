/* globals React */

class Assemblage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {index: [], images: []};
        this.load();
    }
    load () {
        let images = [],
            processes = this.props.src.length; 
        this.props.src.forEach((source, i) => {
            let img = new Image();
            for (let key in source)
                img[key] = source[key];
            img.onload = () => {
                images[i] = img;
                processes--;
                if (!processes) {
                    this.setState({images: images});
                    this.index(this.props.col);
                }
            };
        });
    }
    index (col) {
        let index = [],
            images = [];
        this.state.images.forEach((img, i) => {
            img.proportion = img.height / img.width;
            img.index = i;
            img.row = 0;
            while (img.index - col >= 0) {
                img.index -= col;
                img.row++;
            }
            if (img.row)
                img.top = index[img.row - 1][img.index].top + index[img.row - 1][img.index].proportion;
            else
                img.top = 0;
            if (index[img.row] == undefined)
                index[img.row] = [];
            index[img.row][img.index] = img;
            images[i] = img;
        });
        this.setState({index: index, images: images});
    }
    render () {
        let ImageNodes;
        if (this.state.images.length) {
            ImageNodes = this.state.images.map((img, i) => {
                let width = this.props.x / this.props.col;
                return (
                    <div key={i} style={{width: width, left: img.index * width, top: img.top * width, position: 'absolute'}}>
                        {this.props.template(img)}
                    </div>
                );
            });
        }
        return <div style={{position: 'relative'}}>{ImageNodes}</div>;
    }
}

export default Assemblage;