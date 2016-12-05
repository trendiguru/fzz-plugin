import addPlayer from './player';
import {CRAZY_AD_RECIPIENTS, PID} from 'constants';
//----ad-test----//
let count = 0;
const PARAMS = [ '303084288'];
const ADS_NUMBER = PARAMS.length;
const PLAYER_HEIGHT = 250;
const PLAYER_WIDTH = 300;
const MIN_BORDER = 0;

function validContainer(container){
    let contStyle = window.getComputedStyle(container);
    let contHeight = window.parseInt(contStyle.height.slice(0,-2));
    let contWidth = window.parseInt(contStyle.width.slice(0,-2));
    console.log("validContainer");
    console.log(contHeight);
    console.log(contWidth);
    return (PLAYER_HEIGHT/PLAYER_WIDTH < ((contHeight - MIN_BORDER*2)/contWidth));
}

export default function addAd(tgImg){
    if (count<ADS_NUMBER && CRAZY_AD_RECIPIENTS.includes(PID) && validContainer(tgImg.contentBlock)) {
        try {
            var playerContainer = tgImg.contentBlock;
            var player = document.createElement("DIV");
            player.style.width = '90%';
            player.style.height = '90%';
            player.style.position = 'absolute';
            player.style.margin = '5%';
            addPlayer(player, PARAMS[count]);
            playerContainer.insertBefore(player, playerContainer.childNodes[0]);
            count++;
            return true;
        } catch (err) {
            console.error(err);
            throw {
                name: err,
                element: tgImg
            };
        }
    }
    return false;
}
//-----end-test-----//
