function openMenu() {
    body.classList.add('opened');
    nav.classList.add('opened');
    is_open_menu = true;
}

function closeMenu() {
    body.classList.remove('opened');
    nav.classList.remove('opened');
    is_open_menu = false;
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
        }
        else{ // else consider this a vertical movement
            dir = (distY < 0)? 'up' : 'down'
            handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
        }
        e.preventDefault() // prevent scrolling when inside DIV
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


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        is_open_menu = false;
        body = document.body
        nav = document.getElementById('nav-left');
        transitions = document.getElementsByClassName("transition-page");
        elemets_banner = document.getElementsByClassName('input_checked');
        forward = document.getElementById("forward");
        show('page1');
        slider = document.getElementById('slider');
        app.receivedEvent('deviceready');
        back = document.getElementById("back");
        if (window.localStorage.getItem('language')){
            // alert("Salvou o language");
        }else {
            // alert("Não tinha language");
            window.localStorage.setItem('language', 1);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        document.getElementById('sidebar-toggle').onclick = function(){
            if(!is_open_menu) { 
                openMenu();
            } else {
               closeMenu();
            };  
        }
        for (var i = transitions.length - 1; i >= 0; i--) {
            transitions[i].onclick = function(){
                show(this.getAttribute("href"));
            };
        };
        forward.onclick = function(){
            forward_element(elemets_banner);
        };

        back.onclick = function(){
            back_element(elemets_banner);
        };
        // ontouch(slider, function(evt, dir, phase, swipetype, distance){
        //     if (phase == 'end') {
        //         if (dir == 'left'){
        //             forward_element(elemets_banner);
        //             event.stopPropagation();
        //         };
        //         if (dir == 'right') {
        //             back_element(elemets_banner);
        //             event.stopPropagation();
        //         };
        //     };
        // });
        // ontouch(document.body, function(evt, dir, phase, swipetype, distance){
        //     if (phase == 'end') {
        //         if (dir == 'left'){
        //             if (is_open_menu) {
        //                 closeMenu();
        //             };
        //         };
        //         if (dir == 'right') {
        //             if (!is_open_menu) {
        //                 openMenu();
        //             };
        //         };
        //     };
        // });
    }
};


