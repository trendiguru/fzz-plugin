//107.78
const pid ="303084288[CB]";
const playerUrl = "https://c.algovid.com/player/cedato_player_107.78_d.js";
const playerParams = "?sid=%5BSUBID%5D&h=250&cb=%5BCB%5D&d=%5BURL%5D&pv=107.78&w=300&p=303084288&mid=s6.algovid.com";
let gpvUrl =  "data:;base64,eyJmcyI6W1t7ImlkIjoiMTY3NDk2NDY5NCIsInN1cHBvcnRTU0wiOiIxIiwiZ3JvdXAiOiIxIiwidXJsIjoiaHR0cHM6XC9cL3MzLXVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC9jZWRhdG90ZXN0XC9TcGVlZF9DaGFsbGVuZ2VfVFZfU3BvdC54bWwiLCJtdnIiOjEsInBsYXllcklkIjoiMzAzMDg0Mjg4IiwiY3QiOiIzIiwicGlkIjoiMzAzMDg0Mjg4IiwicnBtIjoiV2tGRUxrbFRlVk41UGt4NmIydGJkcmVkR0dOR1dBeFVwZEhjeHJjU1dNNH4ifSx7ImFwIjp0cnVlLCJpZCI6ImMiLCJ0dnIiOjI1MCwibmkiOiIxIiwiaW0iOiIwIiwiY28iOmZhbHNlLCJzZGx2ZSI6IjEiLCJjb250ZW50Ijp7ImNwZiI6ZmFsc2UsInR5cGUiOjEsIndhaXQiOjAsImNsaWNrIjoiaHR0cDpcL1wvd3d3LmNlZGF0by5jb20iLCJjbCI6ZmFsc2V9LCJjdmFycyI6eyJJUCI6IjM3LjE0Mi4yMTcuMTI4IiwiRE5UIjoiMCJ9LCJ2d2YiOjEsImFzIjpmYWxzZSwic2RscGUiOiIxIiwiaG8iOmZhbHNlLCJncHZjayI6IjI0NjgwOTgifV0sW3siaWQiOiIxNjc0OTY0Njk0Iiwic3VwcG9ydFNTTCI6IjEiLCJncm91cCI6IjEiLCJ1cmwiOiJodHRwczpcL1wvczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2NlZGF0b3Rlc3RcL1NwZWVkX0NoYWxsZW5nZV9UVl9TcG90LnhtbCIsIm12ciI6MSwicGxheWVySWQiOiIzMDMwODQyODgiLCJjdCI6IjMiLCJwaWQiOiIzMDMwODQyODgiLCJycG0iOiJLMHQ2WHpob1NVUnNlR2Q3YjBCVlZHeEo4YUNJWWlTLWktRnlnd3R5U2lvfiJ9LHsiYXAiOnRydWUsImlkIjoiYyIsInR2ciI6MjUwLCJuaSI6IjEiLCJpbSI6IjAiLCJjbyI6ZmFsc2UsInNkbHZlIjoiMSIsImNvbnRlbnQiOnsiY3BmIjpmYWxzZSwidHlwZSI6MSwid2FpdCI6MCwiY2xpY2siOiJodHRwOlwvXC93d3cuY2VkYXRvLmNvbSIsImNsIjpmYWxzZX0sImN2YXJzIjp7IklQIjoiMzcuMTQyLjIxNy4xMjgiLCJETlQiOiIwIn0sInZ3ZiI6MSwiYXMiOmZhbHNlLCJzZGxwZSI6IjEiLCJobyI6ZmFsc2UsImdwdmNrIjoiMjQ2ODA5OCJ9XV19";
let CEDATO_TAG = window.CEDATO_TAG;
let version = undefined;//Did't found it (((

export default function cedatoTagInitfunction() {
  function injectScript(src, callback) {
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0] || document.documentElement;
    if(callback) {
      src += "&callback=" + callback;
    }
    script.src = src;
    script.type = 'text/javascript';
    script.async = 1;
    head.appendChild(script);
  }

  var flash = 0;

  try {
    flash = parseFloat(navigator.plugins["Shockwave Flash"].description.replace(/[\D]*([\d\.]*).*/g,'$1')) >= 10;
  } catch(e) {}

  try {
    if(!flash && window.ActiveXObject) {
      flash = !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
    }
  } catch(e) {}

  var gpvData;
  var gpvRegex = gpvUrl.match(/^data:(.*?)(;base64)?,(.*)$/);
  if(gpvRegex) {
    try {
      gpvData = JSON.parse(gpvRegex[2]==';base64' ?  atob(gpvRegex[3]) : decodeURIComponent(gpvRegex[3]));
      if(gpvData.fs) {
        gpvData = gpvData.fs[flash ? 1 : 0];
      }
    } catch(e) {}
    gpvUrl = undefined;
  }
  else {
    if(!flash) {
      gpvUrl += '&f=0';
    }
  }

  var player = {
    id: pid,
    params: playerParams,
    gpvUrl: gpvUrl,
    gpvData: gpvData,
    currentScript: document.currentScript,
  };

  if(CEDATO_TAG) {
    CEDATO_TAG.players.push(player);
  } else {
    CEDATO_TAG = {
      autoStart: true,
      players: [player],
      version: version,
    };
    injectScript(playerUrl);
  }

  if(CEDATO_TAG.init) {
    CEDATO_TAG.init();
  } else if(!gpvData && gpvUrl) {
    var callback = 'cd_'+(Math.random()*10000 | 0);

    player.onloadGPV = function(data) {
      player.gpvData = data;
    };

    window[callback] = function(data) {
      player.onloadGPV(data);
    };

    injectScript(gpvUrl, callback);
  }
  return CEDATO_TAG;
}
