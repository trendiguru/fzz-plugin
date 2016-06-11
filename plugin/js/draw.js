import {isVisible} from 'ext/visibility';
import {analytics} from 'modules/analytics_wrapper';
import * as overlay from './overlay';
import {REQUESTS, STACKS} from 'modules/devTools';
import getUI from './ui';

let ui = getUI({overlay});
let doTrackVisible = true;
REQUESTS.active = true;

export default function draw (tgImg) {
  let {element, buttonDiv} = tgImg;
  buttonDiv = buttonDiv || ui.overlay(tgImg);
  svgWrap(tgImg.element, buttonDiv);
}

function trackButtonSeen(el, rect){
  if(isVisible(el, rect)){
    // Make sure the user sees the button for more than an instant.
    setTimeout(() => {
      if(doTrackVisible && isVisible(el, rect)){
          doTrackVisible = false;
          analytics.track('Button Seen');
          REQUESTS.set('Button Seen','property');
      }
    }, 1000);
  }
}

function svgWrap(img, content) {
  var svg = document.createElementNS('https://www.w3.org/TR/SVG', 'svg');
  svg.setAttribute('width', img.width);
  svg.setAttribute('height', img.height);
  let foreignObject = document.createElementNS('https://www.w3.org/TR/SVG', 'foreignobject');
  foreignObject.setAttribute('width', img.width);
  foreignObject.setAttribute('height', img.height);
  svg.appendChild(foreignObject);
  img.parentElement.insertBefore(svg, img);
  foreignObject.appendChild(img);
  foreignObject.appendChild(content);
  STACKS.set("svg", svg);
  STACKS.set("content", content);
  content.setAttribute("style", `width:${img.width}px; height:${img.height}px; top: 0px; left: 0px`);
}
