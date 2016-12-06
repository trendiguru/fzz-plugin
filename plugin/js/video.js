import addPlayer from './player';
import {
    CRAZY_AD_RECIPIENTS,
    PID
} from 'constants';
const LAYER_CLASSNAME = 'fzz-ad-layer';
//----ad-test----//
let count = 0;
const PARAMS = ['196083928'];
const ADS_NUMBER = PARAMS.length;
const PLAYER_HEIGHT = 200;
const PLAYER_WIDTH = 300;
const MIN_BORDER = 5;
const PLAYER_CLASSNAME = 'fzz-ad-player';

function validContainer(container) {
    let contStyle = window.getComputedStyle(container);
    let contHeight = window.parseInt(contStyle.height.slice(0, -2));
    let contWidth = window.parseInt(contStyle.width.slice(0, -2));
    return (contWidth && (PLAYER_HEIGHT / PLAYER_WIDTH < ((contHeight - MIN_BORDER * 2) / contWidth)));
}

function calculateStyle(player, container) {
    let contStyle = window.getComputedStyle(container);
    let contWidth = window.parseInt(contStyle.width.slice(0, -2));
    let contHeight = window.parseInt(contStyle.height.slice(0, -2));
    let playerHeight = contWidth * (PLAYER_HEIGHT / PLAYER_WIDTH);
    let height = (playerHeight / contHeight) * 100; // TODO : contHeight must be != 0!!!!!!
    player.style.height = height + '%';
    player.style.width = '100%';
    player.style.position = 'absolute';
    player.style.top = '0px';
    player.className = PLAYER_CLASSNAME;
    player.style.marginTop = player.style.marginBottom = ((1 - (playerHeight / contHeight)) * 50) + '%';
}

function addLayer(container) {
    let layer = document.createElement('DIV');
    layer.style.height = '100%';
    layer.style.width = '100%';
    layer.style.position = 'absolute';
    layer.style.backgroundColor = 'rgba(111, 20, 80, 0.701961)';
    layer.style.top = '0px';
    layer.className = LAYER_CLASSNAME;
    container.appendChild(layer);
    return layer;
}

export default function addAd(tgImg) {
    var playerContainer = tgImg.contentBlock;
    if (count < ADS_NUMBER && CRAZY_AD_RECIPIENTS.includes(PID) && validContainer(playerContainer)) {
        try {
            var player = document.createElement("DIV");
            calculateStyle(player, playerContainer);
            let destroy = addPlayer(player, playerContainer, PARAMS[count]);
            let layer = addLayer(playerContainer);
            layer.addEventListener('click', function(ev) {
                destroy();
                ev.stopPropagation();
            });
            playerContainer.appendChild(player);
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
