//Paste this in the console

var pid = "DEV";
var api = "nd";

var s = document.createElement('script');
s.setAttribute("id", "fzz-script");
s.setAttribute("data-pid", pid);
s.setAttribute("data-api", api);
//s.setAttribute("data-subid", "test-subid");
//s.setAttribute("data-whitelist", "");
//s.setAttribute("data-blacklist", "");
console.log(s);
console.log(document.head);
s.src = "https://fzz-test.storage.googleapis.com/b_plugin.js";
var head = document.head || document.getElementsByTagName("head")[0];// IE
head.appendChild(s);
