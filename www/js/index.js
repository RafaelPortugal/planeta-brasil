var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        is_open_menu = false;
        body = document.body
        nav = document.getElementById('nav-left');
        transitions = document.getElementsByClassName("transition-page");
        elemets_banner = document.getElementsByClassName('input_checked');
        forward = document.getElementById("forward");
        slider = document.getElementById('slider');
        back = document.getElementById("back");
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        swipe_menu();
        body = document.body;
        forward = document.getElementById("forward");
        forward.addEventListener("click", function(e) {
            alert('Frente');
            forward_element(elemets_banner);
            e.preventDefault();
        });
        
        back = document.getElementById("back");
        back.addEventListener("click", function(e) {
            alert('Back');
            back_element(elemets_banner);
            e.preventDefault();
        });

        menuAchor = document.getElementsByClassName('menu')[0];
        menuAchor.addEventListener("click", function(e) {
            e.preventDefault();
            if (body.classList.length == 0) {
                body.className = "menu-active";
            }else {
                body.className = "";
            };
        });
        ontouch(slider, function(evt, dir, phase, swipetype, distance){
            if (phase == 'end') {
                if (dir == 'left'){
                    forward_element(elemets_banner);
                    event.stopPropagation();
                };
                if (dir == 'right') {
                    back_element(elemets_banner);
                    event.stopPropagation();
                };
            };
        });
        // document.getElementById('sidebar-toggle').onclick = function(){
        //     if(!is_open_menu) { 
        //         openMenu();
        //     } else {
        //        closeMenu();
        //     };  
        // }
        // slider(slider);

        // forward.addEventListener("click", function(e) {
        //     forward_element(elemets_banner);
        //     e.preventDefault();
        // });
        // back.addEventListener("click", function(e) {
        //     back_element(elemets_banner);
        //     e.preventDefault();
        // });

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
        // swipe_menu();
    }
};


