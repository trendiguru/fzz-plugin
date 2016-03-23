/* globals React */

class Loading extends React.Component {
    render () {
        let DivNodes = [], i;
        for (i = 0; i < 8; i++) {DivNodes.push(<div key={i}></div>);}
        return (
            <div id="loading">
                <div id="loader">{DivNodes}</div>
                <span>LOADING</span>
            </div>
        );
    }
}

export default Loading;