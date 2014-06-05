function openMenu() {
    body.className = "menu-active";
}

function closeMenu() {
    body.className = "";
    // header = getElementsByTagName('header')[0];
    // header.
}

function show(elementID) {
    var element = document.getElementById(elementID.replace('#', ''));
    if (!element) {
        alert("Pagina não encontrada");
        return;
    }
    var pages = document.getElementsByClassName('show-page');
    for (var i = pages.length - 1; i >= 0; i--) {
        pages[i].classList.remove('show-page');
    };
    closeMenu();
    element.classList.add('show-page');
}

function forward_element(elements) {
    length = elements.length -1; 
    for (var i = 0; i <= length; i++) {
        if (elements[i].checked){
            if (i == length) {
                elements[0].checked = true;
                return;
            } else {
                elements[i+1].checked = true;
                return;
            }
        }
    }
}

function back_element(elements) {
    length = elements.length - 1; 
    for (var i = 0; i <= length; i++) {
        if (elements[i].checked){
            if (i == 0) {
                elements[length].checked = true;
                return;
            } else {
                elements[i-1].checked = true;
                return;
            }
        }
    }
}

function ontouch(el, callback){

    var touchsurface = el,
    dir,
    swipeType,
    startX,
    startY,
    distX,
    distY,
    threshold = 400, //required min distance traveled to be considered swipe
    restraint = 400, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 800, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handletouch = callback || function(evt, dir, phase, swipetype, distance){}

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        dir = 'none'
        swipeType = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
        // e.preventDefault()

    }, false)
    touchsurface.addEventListener('touchmove', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        if (Math.abs(distX) > Math.abs(distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
            dir = (distX < 0)? 'left' : 'right'
            handletouch(e, dir, 'move', swipeType, distX) // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
            e.preventDefault() // prevent scrolling when inside DIV
        }
        else{ // else consider this a vertical movement
            dir = (distY < 0)? 'up' : 'down'
            handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
        }
    }, false)

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipeType = dir // set swipeType to either "left" or "right"
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipeType = dir // set swipeType to either "top" or "down"
            }
        }
            // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
        handletouch(e, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY)
            // e.preventDefault()
    }, false)
}

var slider = function(element) {
    forward = element.getElementsByClassName('forward')[0];
    back = element.getElementsByClassName('back')[0];
    alert(forward);
    alert(back);
    elements_banner = element.getElementsByClassName('element_banner');
    alert(element_banner);
    forward.addEventListener("click", function(e) {
        forward_element(elements_banner);
        e.preventDefault();
    });

    back.addEventListener("click", function(e) {
        back_element(elements_banner);
        e.preventDefault();
    });

    ontouch(element, function(evt, dir, phase, swipetype, distance){
        if (phase == 'end') {
            if (dir == 'left'){
                forward_element(elements_banner);
                event.stopPropagation();
            };
            if (dir == 'right') {
                back_element(elements_banner);
                event.stopPropagation();
            };
        };
    });
}


var swipe_element_1 = function(){
    ontouch(document.getElementById('swipe1'), function(evt, dir, phase, swipetype, distance){
        event.stopPropagation();
        if (phase == 'end') {
            if (dir == 'left'){
                if (body.classList.length != 0) {
                    body.className = "";
                };
            };
            if (dir == 'right') {
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                };
            };
        };
    });
}

var swipe_menu = function(){
    ontouch(document.body, function(evt, dir, phase, swipetype, distance){
        if (phase == 'end') {
            var pages = {language: 0, loading: 1, login: 2};
            var page = window.location.href.split('/')[(window.location.href.split('/').length)-1];
            if (dir == 'left'){
                if (distance < -150) {
                    if (body.classList.length != 0) {
                        body.className = "";
                    };
                }
            };
            if (dir == 'right') {
                if (distance > 150) {
                    if (body.classList.length == 0) {
                        body.className = "menu-active";
                    };
                }
            };
        };
    });
}


var swipe_element_1 = function(){
    ontouch(document.getElementById('swipe1'), function(evt, dir, phase, swipetype, distance){
        event.stopPropagation();
        if (phase == 'end') {
            if (dir == 'left'){
                if (body.classList.length != 0) {
                    body.className = "";
                };
            };
            if (dir == 'right') {
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                };
            };
        };
    });
}


var swipe_element_2 = function(){
    ontouch(document.getElementById('swipe2'), function(evt, dir, phase, swipetype, distance){
        if (phase == 'end') {
            if (dir == 'left'){
                if (body.classList.length != 0) {
                    body.className = "";
                };
            };
            if (dir == 'right') {
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                };
            };
        };
    });
}




var fadeOut = function(idElement){
    s = document.getElementById(idElement).style;
    s.opacity = 1;
    (function fade(){(s.opacity-=0.1)<=0.2?s.display="none":setTimeout(fade,40)})();
};

var fadeIn = function(idElement){
    s = document.getElementById(idElement).style;
    s.opacity = 0;
    s.display="block";
    (function fade(){(s.opacity+=0.1)<1?s.opacity=1:setTimeout(fade,40)})();
};


function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
var insertMessage = function(element, message, className) {
    var div = document.createElement('div');
    div.className = className;
    var span = document.createElement('span');
    span.textContent = message;
    div.appendChild(span);
    element.appendChild(div);
    return div
}

var loading = function() {
    var body = document.getElementsByTagName('body')[0];
    var floatingCircles = document.createElement('div');
    floatingCircles.id = "floatingCirclesG";

    var frotateG_01 = document.createElement('div');
    frotateG_01.className = 'f_circleG';
    frotateG_01.id = 'frotateG_01';
    floatingCircles.appendChild(frotateG_01);

    var frotateG_02 = document.createElement('div');
    frotateG_02.className = 'f_circleG';
    frotateG_02.id = 'frotateG_02';
    floatingCircles.appendChild(frotateG_02);


    var frotateG_03 = document.createElement('div');
    frotateG_03.className = 'f_circleG';
    frotateG_03.id = 'frotateG_03';
    floatingCircles.appendChild(frotateG_03);


    var frotateG_04 = document.createElement('div');
    frotateG_04.className = 'f_circleG';
    frotateG_04.id = 'frotateG_04';
    floatingCircles.appendChild(frotateG_04);


    var frotateG_05 = document.createElement('div');
    frotateG_05.className = 'f_circleG';
    frotateG_05.id = 'frotateG_05';
    floatingCircles.appendChild(frotateG_05);


    var frotateG_06 = document.createElement('div');
    frotateG_06.className = 'f_circleG';
    frotateG_06.id = 'frotateG_06';
    floatingCircles.appendChild(frotateG_06);


    var frotateG_07 = document.createElement('div');
    frotateG_07.className = 'f_circleG';
    frotateG_07.id = 'frotateG_07';
    floatingCircles.appendChild(frotateG_07);


    var frotateG_08 = document.createElement('div');
    frotateG_08.className = 'f_circleG';
    frotateG_08.id = 'frotateG_08';
    floatingCircles.appendChild(frotateG_08);

    overlaySpin = document.createElement('div');
    overlaySpin.id = 'overlay-spin';

    overlaySpin.appendChild(floatingCircles);

    body.insertBefore(overlaySpin, body.firstChild);
};

var hideLoading = function() {
    var el = document.querySelector('#overlay-spin');
    el.parentNode.removeChild( el );
};