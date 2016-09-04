import React from 'react';
import Block from './block';

const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;
const HEIGHT = '50px';
const BLOCK_STYLE = {
    fontSize: '50%',
    height: HEIGHT,
    width: '100%',
    left:'-'+BORDER_WIDTH+'px',
    top:'-'+BORDER_WIDTH+'px',
    backgroundColor: BACKGROUND_COLOR,
    borderColor: BORDER_COLOR,
    borderWidth: BORDER_WIDTH,
    resize: 'both',
    borderStyle: 'solid',
    position:'relative'
};

function initStyle(){
    let styleObj = {};
    for (let key in BLOCK_STYLE){
        styleObj[key] = BLOCK_STYLE[key];
    }
    return styleObj;
}

let ID = -1;

export default class Box extends React.Component{
    constructor(props={}){
        super(props);
        this.props.key = ID++;
        this.props.childNum = this.props.childNum || 3;
        this.createRow = this.createRow.bind(this);
        this.render = this.render.bind(this);
        this.state = {styleString: initStyle()};
        this.state.children = this.state.children ||
        Array.from(Array(this.props.childNum)).map(()=>{return (new Block({children:this.createRow()})).render()});
    }
    render(){
        return <div style={this.state.styleString} key={this.props.key}>
            <p>developer configuration</p>
            {this.state.children}
        </div>;
    }
    createRow(text='text', value='value'){
        let style = {
            width:'40%',
            height:'90%',
            position:'relative',
            display: 'inline-block',
            left:+2*BORDER_WIDTH+'px',
            top:'-'+3*BORDER_WIDTH+'px',
            fontFamily: "'Times New Roman', Times, serif",
            fontStyle: 'oblique',
            fontSize: '23',
        };
        return [
            <p style={style} key={0}>{text}</p>,
            <input type={'text'}  value={value} key={1} style={style}></input>
        ];
    }
    fillTable(obj){
        let  elems = [];
        for (let key in obj){
            elems.push((new Block({children:this.createRow(key, obj[key])})).render());
        }
        //this.setState({children:elems});
        this.state.children = elems;
    }
}
