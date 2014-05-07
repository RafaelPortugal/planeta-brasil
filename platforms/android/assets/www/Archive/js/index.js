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
        // show('page1');
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
            event.preventDefault();
            if(!is_open_menu) { 
                openMenu();
            } else {
               closeMenu();
            };  
        }
        
        swipe_menu();
    }
};


