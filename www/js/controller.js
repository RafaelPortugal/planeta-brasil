function Menu(language) {
    this.language = language

}

var planetaBrasilControllers = angular.module('planetaBrasilControllers', []);

planetaBrasilControllers.controller('LanguageCtrl', ['$scope', '$http',
    function ($scope, $http ) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
        $scope.chooseLanguage = function(id_language) {
            window.localStorage.setItem('language', id_language);
            setup_push_plugin();
            window.location.href = "#login";
        }
    }]
);

planetaBrasilControllers.controller('LoginCtrl', ['$scope', '$http',
    function ($scope, $http ) {
        if (window.localStorage.getItem('language') == 2) {
            $scope.passaport = "passaport";
            $scope.login = "Login";
            $scope.advance = "Next";
            $scope.skip = "Skip this step";
            $scope.or = "or";
        } else if(window.localStorage.getItem('language') == 3) {
            $scope.passaport = "pasaporte";
            $scope.login = "Login";
            $scope.advance = "Próximo";
            $scope.skip = "Omitir este passo";
            $scope.or = "o";
        } else {
            $scope.passaport = "Passaporte";
            $scope.login = "Identifique-se";
            $scope.advance = "Avançar";
            $scope.skip = "Pular essa etapa";
            $scope.or = "ou";
        };
        $scope.$on('$viewContentLoaded', function() {
        });
    }]
);


planetaBrasilControllers.controller('LoadingCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        var language = window.localStorage.getItem('language');
        if (language == 2) {
            message = "Wait, we are carrying the information of your city.";
        }else if (language == 3) {
            message = "Por favor, espere un momento mientras cargamos la información de tu ciudad.";
        }
        else {
            message = "Aguarde, estamos carregando as informações da sua cidade.";
        }

        $scope.message = message;
        $scope.$on('$viewContentLoaded', function() {
            var language = window.localStorage.getItem('language');
            $rootScope.items = menu[language];
            setTimeout(function(){
                window.location.href = "#home";
            },4000);
        });
    }]
);

planetaBrasilControllers.controller('HomeCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {

        $scope.items = $rootScope.items;
        $scope.home = home;
        $scope.$on('$viewContentLoaded', function() {
            banner = document.getElementsByClassName('element_banner');
            elemets_banner = document.getElementsByClassName('input_checked');
            ontouch(document.getElementById('slider'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_banner);
                    };
                    if (dir == 'right') {
                        back_element(elemets_banner);
                    };
                };
            });
            elemets_match = document.getElementsByClassName('input_checked_match');
            ontouch(document.getElementById('next-macth'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_match);
                    };
                    if (dir == 'right') {
                        back_element(elemets_match);
                    };
                };
            });

            swipe_menu();

            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
            forward = document.getElementById("forward");
            forward.addEventListener("click", function(e) {
                forward_element(elemets_banner);
                e.preventDefault();
            });
            
            back = document.getElementById("back");
            back.addEventListener("click", function(e) {
                back_element(elemets_banner);
                e.preventDefault();
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.item, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       }
    }]
);

planetaBrasilControllers.controller('LastGamesCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $rootScope, $rootParams, $http ) {

        offset = $rootParams.offset;
        $scope.items = $rootScope.items;
        if (offset == 0) {
            $scope.last_games = lastGames;
        }else {
            $scope.last_games = lastGames_10;
        }
        paginate = parseInt(lastGames.total / 10);
        rest = lastGames.total % 10;
        if (paginate > 0 && rest != 0) {
            paginate += 1;
        }
        $scope.paginate = Array.apply(null, Array(paginate)).map(function (_, i) {return {"num": i+1, "id": i*10, "active": i*10 == offset};});

        $scope.$on('$viewContentLoaded', function() {
            swipe_menu();

            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.item, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       }
    }]
);

planetaBrasilControllers.controller('CuriosityCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        language = localStorage.getItem('language');
        $scope.items = $rootScope.items;
        $scope.curiosities = curiosities[language];
        $scope.$on('$viewContentLoaded', function() {

            elemets_banner = document.getElementsByClassName('input_checked');
            ontouch(document.getElementById('curiosity'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_banner);
                    };
                    if (dir == 'right') {
                        back_element(elemets_banner);
                    };
                };
            });
            swipe_menu();

            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);


planetaBrasilControllers.controller('PhotoFansCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.items = $rootScope.items;
        $scope.photos = photos;
        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);


planetaBrasilControllers.controller('StadiumsCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        var language = window.localStorage.getItem('language');
        if (language == 2) {
            $scope.lang_stadium = "Stadiums";
            
        }else if (language == 3) {
            $scope.lang_stadium = "Estadios";
        }else {
            $scope.lang_stadium = "Estádios";
        }
        $scope.stadiums = stadiums;
        $scope.items = $rootScope.items;
        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);


planetaBrasilControllers.controller('StadiumCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $rootScope, $routeParams, $http ) {
        var language = window.localStorage.getItem('language');
        if (language == 2) {
            $scope.lang_stadium = "Stadiums";
            
        }else if (language == 3) {
            $scope.lang_stadium = "Estadios";
        }else {
            $scope.lang_stadium = "Estádios";
        }
        $scope.language = language;
        $scope.stadium = stadiums[$routeParams.stadiumId];
        $scope.items = $rootScope.items;
        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);


planetaBrasilControllers.controller('PlayersByTeamCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $rootScope, $routeParams, $http ) {
        var letter_group = $routeParams.teamId[0];
        var position_team = $routeParams.teamId[1];
        var language = window.localStorage.getItem('language');
        
        $scope.items = $rootScope.items;
        $scope.letter_group = letter_group;
        $scope.position_team = position_team;
        team_object = teamPerGroup[letter_group][position_team];
        $scope.img = team_object.img;
        $scope.team_name = team_object[language];
        $scope.players = team_object['players'];
        $scope.language = language;
        if (language == 2) {
            $scope.group = "Group";
        }else {
            $scope.group = "Grupo";
        }

        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);


planetaBrasilControllers.controller('ShowNewsCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.items = $rootScope.items;
        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);



planetaBrasilControllers.controller('TeamPerGroupCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.items = $rootScope.items;
        $scope.teams = teamPerGroup
        var language = window.localStorage.getItem('language');
        $scope.language = language
        if (language == 2) {
            $scope.group = "Group";
        }else {
            $scope.group = "Grupo";
        }
        $scope.$on('$viewContentLoaded', function() {
            elemets_banner = document.getElementsByClassName('input_checked');
            ontouch(document.getElementById('team-per-group'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_banner);
                    };
                    if (dir == 'right') {
                        back_element(elemets_banner);
                    };
                };
            });
            swipe_menu();
            
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);



/**
 **   Controllers que usam API externa
 **/

 //1a Fase
planetaBrasilControllers.controller('TableGamesCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $http = $rootScope;

        language = window.localStorage.getItem('language');
        if (language == 2) {
            $scope.th_match = "Game day";
        }else if (language == 3) {
            $scope.th_match = "DÍA DEL JUEGO";
        }else {
            $scope.th_match = "DIA DO JOGO";
        }
        $scope.items = $rootScope.items;
        
        //$scope.matches = matches;
        
        $scope.$on('$viewContentLoaded', function() {
elemets_banner = document.getElementsByClassName('input_checked');
            ontouch(document.getElementById('team-per-group'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_banner);
                    };
                    if (dir == 'right') {
                        back_element(elemets_banner);
                    };
                };
            });
            swipe_menu();
            
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };

        $http({method: 'GET', url: API_ROOT_URL + '/api/matches_by_groups/'}).
            success(function(data, status, headers, config) {
            //alert(data);
            $scope.matches = data;

          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });

    }]
);



// Palpites
planetaBrasilControllers.controller('WorldChampionshipCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $http = $rootScope;
        $scope.items = $rootScope.items;
        language = localStorage.getItem('language');
        //$scope.guess = guess[language];        

        $scope.$on('$viewContentLoaded', function() {
            body = document.body;
            menuAchor = document.getElementsByClassName('menu')[0];
            menuAchor.addEventListener("click", function(e) {
                e.preventDefault();
                if (body.classList.length == 0) {
                    body.className = "menu-active";
                }else {
                    body.className = "";
                };
            });
        });

        document.getElementById('guess_id').onchange = function() {
            this.disabled = true;
            var data = 'country=' + this.value;
            var request = new XMLHttpRequest();
            request.open('POST', API_ROOT_URL + '/api/guesses/', true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.send(data);
        };
        
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };

        $http({method: 'GET', url: API_ROOT_URL + '/api/guesses/'}).
            success(function(data, status, headers, config) {
            
            $scope.guess = data[language];

          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });


    }]
);

