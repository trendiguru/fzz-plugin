import Block from './block';
import React from 'react';
import ReactDOM from 'react-dom';

const BACKGROUND_COLOR = 'rgba(1,2,3,1)';
const BORDER_COLOR = 'blue';
const BORDER_WIDTH = 4;

let wrapper = document.createElement("DIV");
wrapper.className = "react-container";
document.body.appendChild(wrapper);
wrapper.style.height ='100%';


let props = {
    styleString: {
        fontSize: '50%',
        width: '100%',
        height: '100%',
        lineHeight: '100%',
        left:'-'+BORDER_WIDTH+'px',
        top:'-'+BORDER_WIDTH+'px',
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        resize: 'both',//'inherit',
        borderStyle: 'solid',
        position:'relative',
        //padding:'5px'
    }
};

function createBoard(rowNum){
    let l = [];
    for (let i=0;i<rowNum;i++){
        let rowProps = {
            styleString: {
                fontSize: '50%',
                height: (100.0/rowNum)+'%',
                width: '100%',
                left:'-'+BORDER_WIDTH+'px',
                top:'-'+BORDER_WIDTH,
                backgroundColor: BACKGROUND_COLOR,
                borderColor: BORDER_COLOR,
                borderWidth: BORDER_WIDTH,
                resize: 'both',
                borderStyle: 'solid',
                position:'relative',
            }
        };
        l.push((new Block(rowProps)).render());
    }
    props.children = l;
    return new Block(props);
}

ReactDOM.render(createBoard(15).render(), wrapper);
