import addPlayer from './player';
//----ad-test----//
let count = 0;
let params = [ '303084288'];
const ADS_NUMBER = params.length;

export default function addAd(tgImg){
    if (count<ADS_NUMBER && CRAZY_AD_RECIPIENTS.includes(PID)) {
        try {
            var playerContainer = tgImg.contentBlock;
            var player = document.createElement("DIV");
            player.style.width = '100%';
            player.style.height = '100%';
            player.style.position = 'absolute';
            addPlayer(player, params[count]);
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
