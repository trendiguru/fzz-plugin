//Paste this in the console

var pid = "DEV";
var api = "nd"

var s = document.createElement('script');
s.setAttribute("id", "fzz-script");
s.setAttribute("data-pid", pid);
s.setAttribute("data-api", api);
//s.setAttribute("data-subid", "test-subid");
//s.setAttribute("data-whitelist", "");
//s.setAttribute("data-blacklist", "");
s.src = "https://fzz-test.storage.googleapis.com/b_plugin.js";
document.head.appendChild(s);
