export default function addPlayer(targetEl, param){
    console.log("Hi how are you?");
    var sss = document.createTextNode('.player_layout{overflow:hidden;width:100%;height:0;position:relative;background:#000000;margin:0 auto 15px; -webkit-box-shadow: 2px 2px 2px 0px #555555; -moz-box-shadow: 2px 2px 2px 0px #555555; box-shadow: 2px 2px 2px 0px #555555; -webkit-transition:height 1s ease; -moz-transition:height 1s ease; transition:height 1s ease; } .delay{ -webkit-transition:height 1s ease 1s; -moz-transition:height 1s ease 1s; transition:height 1s ease 1s;} .moved{position:fixed; z-index:1000; right:0; bottom:0;} .player_container{margin:0 auto;} .close_but{width:5%; height:auto; position:absolute; top:0; right:0; z-index:10002; cursor:pointer;} .close_img{width:100%;height:auto;}');

    var vid = document.createElement('script'); vid.type = 'text/javascript'; vid.src = 'https://p.algovid.com/player/player.js?p='+param+'&sid=[SUBID]&cb=[CB]&d=[URL]&w=300&h=250';
    var con = document.createElement('div'); con.id = 'video303084288[CB]'; con.className = 'player_container';
    var lay = document.createElement('div'); lay.className = 'player_layout';
    var css = document.createElement('style'); css.type = 'text/css';
    var head = document.getElementsByTagName('head')[0];
    var cedato = document.getElementById('cedato');

    var but = document.createElement('a'); but.className = 'close_but'; but.href= 'javascript:void(0)';
    var img = document.createElement('img'); img.className = 'close_img';  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAQAAABvygHQAAAGZUlEQVRIx42Xb4wdVRXAf/fO3zdv5s28mfd//71ut9uWrbgs2GioFloD6nYptIjutjUtJbvsrrUfpLFRJNQPpvihmGhoaoglMUQ0DUkT9aMSjAIKTbSBRGsMYDVNEIOgQojk+GHe7Jv3uq2959Pcc84vd849995z+CypzLGTYdqM0KLEGiZoU8XHRStyopVLSMIIGxkjoc4axmiwgz1kLPqhwwxToUGMAQqNgYWN0xEbCwONMlRIkzoDtK8OHWKUcaq4Kc7EpkBASEigfBUQUiYioICNiUa5JGxgPfUrQe9glFGSDOhQIjJtB88rtorXFaeKk/66YtVzHccokxDgpOAK4wwxnYfuZje72cUsc4xgkwF15OLH/me8Y87T1jnzNfOS+TfrD84z3veC+8PJkudEuk6Ag4G2afE55tjVoTHbkfv4FGaK9FTiqlLVn7ef1cIqYv61+Fi0NSw6NVWhgIVWfJL5FRaLLLLA19gLoLEIzLBEMGO9gFxNjHeCE3HbD40mRSw06h6+zgKLLMIB9nM/S8QKjUVoe6HtHVfCNYhzLrkl9K0BfCx0wDyL7OcA7GUfh1kPCpPA9iLffarfuSkfk9tkm1x3eSDeiu+KAnMgXW2bL7GPvXAjN/NhUBh4Zhia7pm8U0uOyC/lfcnGq3JKtvWG4b1kOoyMJh4GahNbuBF2cDcl0DgqKeE9mnf4hrwnq42fy4dyVtbfKzf4dZXgoF12MQO3szn99dClNN01rcuLcrVxXw7r/aJSs4cIMFFTfBpuyNYZlSLzQmaWyEUReVnOr4L7l7wkIiKHctjychirGi7aYxLGO1vkUlzuGp0XkWOCIA/0IV+QAUGulzdF5NYVe/dCZcwaTNc6BsOgsYn80P5dZvKwiLy84rCUQ/5mZXZRRP6ZX+uSX6WCgxqAGDQF0/JnstyMRUTk9zmH+Q7yucvmjqx8+2eSum7hoSPwSX/eO56pj3QQR3KIRRF5JfddlddFROQtyQ6y85fK5jQAnsJUWIRewflp5vDSys8u5TCz0pDuNr62YrO1M6cl3l9oUMYyFChswuKgdT5VNnq2ZWGVwxnnkCIPrsxHD/k1EhwUKBwVFDeZF1PVJ/p2e7EP2ZA/9+hPr2jCb4d1al1osXiT8Uaqmr4sL2fzaS7v9Gmf7kJPhS3quBnU96fMS6nqtj6nc7Ixf4HIsT79U13oYz1QQn/c+lOqmuhxeW6VmC72WJzoxvSRUrP7+zZlv+r8qnPryBurpHqv5I/DF7ob+GW/laY/hsIi8uzCE5ny+x3zn0n3MSnLK/JwDrtXPuhY1bO76j/Vnc4IZSytCMAkcCz/UObwURERuZhDJJ0dz2fCIyIi8pOV7+Lz9Y1mu5P8NdAUdBROGm9nBi+KyLOr5mX3ONwhIiLjXatH40HdwsNIYDCNaqVke6czg1ER+a+s69yrr/ZszHLH5qyInOxmxfv16eJomvotWIdSmAROGH28G8MDIvKuHJEH5NJlefu4HJKzIvJ8LhjRD6ttq51efWthEj+9pGtRwT/ZNTssVx+/Frf7oLzdvMUf0zVcdIHrYRuTnWvaqSaD9oUudrrnjPeO7/akWO1oMmK3CbBQm9gOO7kne1AqfphsMf7dNbblaF9ERT6QH8tNvRfME43Rwnod46AL3M2dMMXNTHSeaKMZ+vGdxrt5Fy23ylfklPxIfiDHZU6G+w5CdKYx4Y+bjfSJHmcLU2kttcxoWvL41kDkxzP268i1Sfx4YyIYt1r4WKhBlphjFg5yL8ssEKgMG0aVzcWz/7/wcS7WjtbX+uPWAAE2usBBvsi9HMwKtAeZTetSC99s+o1KM14q/PbKYPvN8unG9qRdWG/W8bHRqF08lBVoc8wxxx7m2Y5Og+DpxB4Kk8qG8nzwpPtHIwdTYv8jeCb+Vn1HdTQYs9s6xsNCw1YW2Nuh5YrePQxjpunlEOiaPeTX41blI/G+8lejE+HJ8DvlbyaHazO1iXi4OGq1dbVTTSuTJp9nD3dlRW++PF/LGspZGFwClegBa7DQ9OulRtgMm6VWccBtm2uMlkoIcNO6tMxYf3ne20isZZwEp1v3ewSUSahSo0aNCmVKeFm971BmAxuu3EhkfdQwCXVCdNrwmJ2Wx8XtND0mBlqpgAY1Bq6ljxqhRcgaJhgmoYjT15wpZRNQZogNrLtCc/Y/PbQWFgHSiHYAAAAASUVORK5CYII=';

    css.appendChild(sss);
    head.appendChild(css);
    but.appendChild(img);
    con.appendChild(but);
    con.appendChild(vid);
    lay.appendChild(con);
    //cedato.parentNode.insertBefore(lay, cedato);
    targetEl.insertBefore(lay, cedato);

    var showTrigger = false;
    var playTrigger = true;
    var playerInterface = null;
    var transitionEnd = transitionEndEventName();
    var visProp  = getHiddenProp();

    console.log("i am still here!");
    window.CEDATO_INIT = function(){
        console.log("this");
        console.log(this);
        playerInterface = this;
        this.overrideInitParams({ autoplay:true });

        addEvent(window, "scroll", playerChangeState);
        addEvent(con, "mouseover", function(){ playerInterface.sound(1); });
        addEvent(con, "mouseout", function(){ playerInterface.sound(0); });

        if(visProp){
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, tabChangeState);
        }

        console.log("hello main");
        tabChangeState();
    }
    //console.log(window.CEDATO_INIT());

    function show(){
        console.log("show");
        playerInterface.resize(getSize(),getSize(1));
        resize();

        addClass(lay,'delay');
        addEvent(lay, transitionEnd, function wait(event){
            removeEvent(lay, transitionEnd, wait);
            removeClass(lay,'delay');
            addEvent(but, "click", destroy);
            addEvent(window, "resize", onResizeListener);
            playerInterface.play();
        }, false);
    }
    function hide(callback){
        playerInterface.pause();
        resize(0);
        addEvent(lay, transitionEnd, function step(event){
            removeEvent(lay, transitionEnd, step);
            callback();
        }, false);
    }
    function destroy(){
        hide(function(){
            playerInterface.close();
            removeEvent(window, "scroll", playerChangeState);
            removeEvent(window, "resize", onResizeListener);
            if(visProp){
                var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
                document.removeEventListener(evtname, tabChangeState);
            }
        });
    }
    function resize(to){
        console.log("resize");
       if(isMobile()){
            if(window.innerHeight < window.innerWidth){
                lay.style.width='60%';
            }else{
                lay.style.width='100%';
            }
        }
        var w = getSize();
        var h = getSize(1);
        if(to==0){ h = 0; }
        lay.style.height=h+'px';
    }
    function move(back){
        console.log("moved");
        if(back){
            removeClass(con,'moved');
            playerInterface.resize(getSize(),getSize(1));
        }else{
            playerInterface.resize(300,150);
            addClass(con,'moved');
        }
    }

    function getSize(side){
        // TODO: add size checking trigger
        if(side){
            console.log("777777")
            console.log(getSize()*0.6);
            return getSize()*0.6;
        }else{
            var allWidth = con.parentNode.offsetWidth;
            var pl = parseInt(window.getComputedStyle(con.parentNode, null).getPropertyValue('padding-left'),10);
            var pr = parseInt(window.getComputedStyle(con.parentNode, null).getPropertyValue('padding-right'),10);
            return allWidth-(pl+pr);
        }
    }

    function isHiddenObj(elm,full){
        var rate = full? full : 0.5;
        var rect = elm.getBoundingClientRect();
        var elemHeight = elm.offsetHeight * rate;
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return ( rect.bottom - elemHeight < 0 || (rect.top + elemHeight) - viewHeight >= 0);
    }

    function playerChangeState(){
        console.log("playerChangeState");
        var hid = isHiddenObj(lay);
        if (hid && playTrigger){
            playTrigger = false;
            playerInterface.pause();
        }else if (!hid && !showTrigger){
            playerInterface.pause();
            playTrigger = true;
            showTrigger = true;
            show();
        }else if (!hid && !playTrigger){
            playTrigger = true;
            playerInterface.play();
        }
    }

    function tabChangeState(){
        console.log("tabChangeState");
        var hid = isHiddenTab();
        if (hid && playTrigger){
            playTrigger = false;
            playerInterface.pause();
        }else if (!hid ){
            playerChangeState();
        }
    }

    function onResizeListener(){
        resize();
        addEvent(lay, transitionEnd, function size(event){
            removeEvent(lay, transitionEnd, size);
            playerInterface.resize(getSize(),getSize(1));
        }, false);
    }

    function addEvent(el, ev, fn){
        if (el.addEventListener){
            el.addEventListener(ev, fn, false);
        }else{
            el.attachEvent("on" + ev, function(){
                return(fn.call(el, window.ev));
            });
        }
    }

    function removeEvent(el, ev, fn){
        if(el.removeEventListener){
            el.removeEventListener(ev, fn, false);
        }else{
            el.detachEvent("on" + ev, fn);
        }
    }

    function transitionEndEventName(){
        var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
        'transition':'transitionend',
        'OTransition':'otransitionend',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
        };
        for(i in transitions){
            if(transitions.hasOwnProperty(i) && el.style[i] !== undefined){
                return transitions[i];
            }
        }
    }

	function addClass(o,c){
        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
        if (re.test(o.className)) return;
        o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    }
    function removeClass(o,c){
        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
        o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
    }
    function isMobile(){
        var check = false;
        (function(a){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a))check=true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    function getHiddenProp(){
        var prefixes = ['webkit','moz','ms','o'];
        if ('hidden' in document){
            return 'hidden';
        }else{
            for (var i = 0; i < prefixes.length; i++){
                if ( (prefixes[i] + 'Hidden') in document){
                    return prefixes[i] + 'Hidden';
                }
            }
            return null;
        }
    }
    function isHiddenTab(){
        return document[getHiddenProp()] || false;
    }
}
