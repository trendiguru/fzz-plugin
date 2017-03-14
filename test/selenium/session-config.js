const CONFIG=[
    {
        remoteHub: 'http://hub.crossbrowsertesting.com:80/wd/hub', 
        caps: {
            name : 'Basic Example',
            build :  '1.0',
            browser_api_name : 'IE10', 
            os_api_name : 'Win7x64-C2', 
            screen_resolution : '1366x768',
            record_video : 'true',
            record_network : 'true',
            browserName : 'internet explorer', //firefox, internet explorer, chrome, opera, or safari
            username : 'admin@trendiguru.com',
            password : 'u1c12cb9333d4b94',
        },
    },
];

module.exports = CONFIG;