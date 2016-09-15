import React from 'react';

const BACKGROUND_COLOR = 'rgba(139, 241, 253,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;
const HEIGHT = '50px';
const BLOCK_STYLE = {
    fontSize: '50%',
    height: HEIGHT,
    width: '100%',
    // left:'-'+BORDER_WIDTH+'px',
    // top:'-'+BORDER_WIDTH+'px',
    backgroundColor: BACKGROUND_COLOR,
    // borderColor: BORDER_COLOR,
    // borderWidth: BORDER_WIDTH,
    resize: 'both',
    align:'middle',
    //borderStyle: 'solid',
    position:'relative',
}
function initStyle(){
    let styleObj = {};
    for (let key in BLOCK_STYLE){
        styleObj[key] = BLOCK_STYLE[key];
    }
    return styleObj;
}

let ID = -1;
export default class Block extends React.Component{
    constructor(props={}){
        super(props);
        this.props.key = ID++;
        this.props.children = this.props.children || [];
        this.render = this.render.bind(this);
        this.state = {styleString : Object.assign(initStyle(), this.props.styleString || {})};
        console.debug(this.state.styleString);
    }
    render(){
        return <div style={this.state.styleString} key={this.props.key}>
            {this.props.children}
        </div>;
    }
}
