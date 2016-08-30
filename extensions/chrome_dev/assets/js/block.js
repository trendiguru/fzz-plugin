import React from 'react';
let ID= -1;
export default class Block extends React.Component{
    constructor(props){
        super(props);
        this.props.key = ID++;
        this.props.children = this.props.children || [];
        this.render = this.render.bind(this);
        this.setSize = this.setSize.bind(this);
    }
    render(){
        return <div style={this.props.styleString} key={this.props.key}>
            {this.props.children}
        </div>;
    }
    setSize(w,h){
        this.props.width = w+'px';
        this.props.height = h+'px';
        console.log(this.props);
    }
}
