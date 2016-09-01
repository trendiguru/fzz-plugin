import Row from './row';
import React from 'react';


const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;

export default class Config extends React.Component{
    constructor(props){
        super(props);
        this.props.styleString = {
            fontSize: '50%',
            width: '100%',
            height: '100%',
            lineHeight: '100%',
            left: '-' + BORDER_WIDTH + 'px',
            top: '-' + BORDER_WIDTH + 'px',
            backgroundColor: BACKGROUND_COLOR,
            borderColor: BORDER_COLOR,
            borderWidth: BORDER_WIDTH,
            resize: 'both',
            borderStyle: 'solid',
            position: 'relative',
        };
        this.render = this.render.bind(this);
    }
    render(){
        return <div style={this.props.styleString}>
            {this.props.keys.map((key)=>{return <Row attribute = {key} value = {preferences[key]} />})}
        </div>;
    }
}
