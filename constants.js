
//const HOST_DOMAIN =  'http://localhost:8000';
const HOST_DOMAIN =  'https://localhost:4443';
//const HOST_DOMAIN =  'https://fzz.storage.googleapis.com';

const constants = {
    HOST_DOMAIN : HOST_DOMAIN,
    MIN_IMG_WIDTH: 201,
    MIN_IMG_HEIGHT: 201,
    DEBUG: false,
    MIXPANEL_ID: '7b61e0db566195263d0fc9d203495e62',
    GA_CODE: 'UA-51323231-3',
    IFRAME_SRC: `${HOST_DOMAIN}/app/desktop.html`,
    CSS_URL: `${HOST_DOMAIN}/plugin/css/plugin.css`,
    IFRAME_ID: 'fazzi',
    INFO_URL: 'http://fazz.co',
    LIBNAME: 'fzz',
    USER_CONFIG: loadUserConfig()
};

function loadUserConfig(){
    let userConfig = {};
    let fzzScript = document.getElementById('fzz-script');
    
    if(fzzScript){
        let userConfigJSON = fzzScript.getAttribute('data-fzz');
        if(userConfigJSON){
            userConfig = JSON.parse(userConfigJSON);
        }
    }
    
    userConfig.whitelist = userConfig.whitelist || '*';
    
    return userConfig;
}

export default constants;