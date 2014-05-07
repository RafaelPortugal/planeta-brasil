function openMenu() {
    body.className = "menu-active";
}

function closeMenu() {
    body.className = "";
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

var swipe_menu = function(){
    ontouch(document.body, function(evt, dir, phase, swipetype, distance){
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