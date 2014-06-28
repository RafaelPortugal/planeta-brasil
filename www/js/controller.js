function Menu(language) {
    this.language = language

}

var alert_connection = function() {
    var language = window.localStorage.getItem('language');
    if (language == 2) {
        alert('Check your connection. Try again later.');
    }else if (language == 3) {
        alert('Compruebe la conexión. Inténtelo de nuevo más tarde..');
    }else {
        alert('Verifique a sua conexão. Tente novamente mais tarde.');
    };
}

var planetaBrasilControllers = angular.module('planetaBrasilControllers', ['ngSanitize']);
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


planetaBrasilControllers.controller('LoginCtrl', ['$scope', '$http', '$location',
    function ($scope, $location, $http ) {
        $scope.language = window.localStorage.getItem('language');
        if (window.localStorage.getItem('language') == 2) {
            $scope.identify_title = "Passaport or CPF";
            $scope.login = "Login";
            $scope.advance = "Next";
            $scope.full_name = "Full name";
        } else if(window.localStorage.getItem('language') == 3) {
            $scope.identify_title = "pasaporte o CPF";
            $scope.login = "Login";
            $scope.advance = "Próximo";
            $scope.full_name = "nombre completo";
        } else {
            $scope.identify_title = "Passaporte ou CPF";
            $scope.login = "Identifique-se";
            $scope.advance = "Avançar";
            $scope.full_name = "nome completo";
        };
        $scope.errors = {
            '1': {
                'full_name_short': 'O nome precisa ter mais que 3 dígitos.',
                'full_name_long': 'O nome precisa ter menos que 20 dígitos.',
                'email': 'Email inválido'
            },
            '2': {
                'full_name_short': 'The name must have more than 3 digits.',
                'full_name_long': 'The name must be less than 20 digits.',
                'email': 'Email inválido'
            },
            '3': {
                'full_name_short': 'El nombre debe tener más de 3 dígitos.',
                'full_name_long': 'El nombre debe ser inferior a 20 dígitos.',
                'email': 'Email inválido'
            }
        }
        $scope.submitForm = function(){
            // alert('submitForm');
            window.localStorage.setItem('email', $scope.email);
            window.localStorage.setItem('full_name', $scope.full_name_form);
            window.localStorage.setItem('identify', $scope.identify);
            email = "email=" + $scope.email;
            name = "name=" + $scope.full_name_form;
            identify = "identify=" + $scope.identify;
            data = [email, name, identify].join('&');
            var request = new XMLHttpRequest();
            request.open('POST', API_ROOT_URL + '/api/login/', true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.send(data);
            $location.path("/loading");
        };
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
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
            setTimeout(function(){
                window.location.href = "#home";
            },4000);
        });

    }]
);



planetaBrasilControllers.controller('CuriosityCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        language = localStorage.getItem('language');
        $scope.url_local = "#/curiosity";
        if (language == 2) {
            $scope.bg_img = "curiosidades_en.jpg";
            $scope.back = "back";
        }else if (language == 3) {
            $scope.bg_img = "curiosidades_es.jpg";
            $scope.back = "Vuelta";
        }else {
            $scope.bg_img = "curiosidades.jpg";
            $scope.back = "Voltar";
        }
        $scope.items = menu[language];
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

planetaBrasilControllers.controller('FacebookCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
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
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);

planetaBrasilControllers.controller('GameCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        $scope.items.height = window.screen.height - 100;
        $scope.url_local = "#/planeta-game";

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
        $scope.items = menu[language];
        $scope.url_local = "#/stadiums";
        if (language == 2) {
            $scope.lang_stadium = "Stadiums";
            $scope.read = "Read more";
            $scope.back = "Back";
            
        }else if (language == 3) {
            $scope.lang_stadium = "Estadios";
            $scope.read = "Leia mais";
            $scope.back = "Voltar";
        }else {
            $scope.read = "Leia mais";
            $scope.lang_stadium = "Estádios";
            $scope.back = "Voltar";
        }
        $scope.stadiums = stadiums;
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
        $scope.url_local = "#/stadium/" + $routeParams.stadiumId;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        if (language == 2) {
            $scope.lang_stadium = "Stadiums";
            $scope.back = "Back";
            
        }else if (language == 3) {
            $scope.lang_stadium = "Estadios";
            $scope.back = "Voltar";
        }else {
            $scope.lang_stadium = "Estádios";
            $scope.back = "Voltar";
        }
        $scope.language = language;
        $scope.stadium = stadiums[$routeParams.stadiumId];
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
        $scope.items = menu[language];
        $scope.url_local = "#/players-by-team/" + $routeParams.teamId;
        $scope.letter_group = letter_group;
        $scope.position_team = position_team;
        team_object = teamPerGroup[letter_group][position_team];
        $scope.img = team_object.img;
        $scope.team_name = team_object[language];
        $scope.players = team_object['players'];
        $scope.language = language;
        if (language == 2) {
            $scope.group = "Group";
            $scope.bg_img = "interna-lista-jogadores_en.jpg";
            $scope.back = "Back";
        }else if (language == 3) {
            $scope.group = "Grupo";
            $scope.bg_img = "interna-lista-jogadores_es.jpg";
            $scope.back = "Vuelta";
        }else {
            $scope.group = "Grupo";
            $scope.bg_img = "interna-lista-jogadores.jpg";
            $scope.back = "Voltar";
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




planetaBrasilControllers.controller('TeamPerGroupCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/team-per-group/";
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        $scope.teams = teamPerGroup
        $scope.language = language
        if (language == 2) {
            $scope.group = "Group";
            $scope.bg_img = "interna-lista-jogadores_en.jpg";
        }else if (language == 3){
            $scope.group = "Grupo";
            $scope.bg_img = "interna-lista-jogadores_es.jpg";
        }else {
            $scope.group = "Grupo";
            $scope.bg_img = "interna-lista-jogadores.jpg";
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
***       COM API 
***/

planetaBrasilControllers.controller('PhotoFansCtrl', ['$scope', '$http',
    function ($scope, $http ) {
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        if (language == 2) {
            $scope.send = "Send a picture";
            $scope.back = "Back";
        }else if (language == 3){
            $scope.send = "Subir una foto";
            $scope.back = "Vuelta";
        }else {
            $scope.send = "Enviar foto";
            $scope.back = "Voltar";
        }

        $scope.language = window.localStorage.getItem('language');
        $scope.url_local = "#/photo-fans";
        $scope.activeMenu = function(item) {
            body.className = "";
       };
        $scope.$on('$viewContentLoaded', function() {
            loading();
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

      var api_url = API_ROOT_URL + '/api/photos/' + '?lang=' + window.localStorage.getItem('language', '1');
      $http({method: 'GET', url: api_url}).
          success(function(data, status, headers, config) {
            hideLoading();
              $scope.photos = data;
      
      }).error(function(data, status, headers, config) {
            hideLoading();
            alert('Ocorreu um erro. Tente novamente.');
      });
    
    }]
);


planetaBrasilControllers.controller('WorldChampionshipCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/world-championship";
        $http = $rootScope;
        language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        if (language == 2) {
            $scope.bg_img = "campeoes-mundiais_en.jpg";
            $scope.guess_result = "Partial guess result";
            $scope.back = "Back";
        }else if (language == 3){
            $scope.bg_img = "campeoes-mundiais_es.jpg";
            $scope.guess_result = "Partial guess result";
            $scope.back = "Back";
        }else {
            $scope.bg_img = "campeoes-mundiais.jpg";
            $scope.guess_result = "Resultado Parcial do Palpite";
            $scope.back = "Voltar";
        }
        $scope.championships = world_championships[language];
        $scope.language = language;
        $scope.select_teams = select_championship;

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
            var email = 'email=' + window.localStorage.getItem('email');
            var country = 'country=' + this.value;
            var data = [email, country].join('&');
            var request = new XMLHttpRequest();
            request.open('POST', API_ROOT_URL + '/api/create-guesses/?lang=' + window.localStorage.getItem('language'), true);
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


       var api_url = API_ROOT_URL + '/api/guesses/' + '?lang=' + language;
        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $scope.guess = data;
          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });

    }]
);
planetaBrasilControllers.controller('WeAreCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.url_local = "#/we-are";
        $scope.items = menu[language];
        if (language == 2) {
            $scope.back = "Back";
        }else if (language == 3) {
            $scope.back = "Vuelta";
        }else {
            $scope.back = "Voltar";
        }
        $scope.$on('$viewContentLoaded', function() {
            loading();
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


       var api_url = API_ROOT_URL + '/api/we-are/' + '?lang=' + language;
        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            hideLoading();
            $http.we_are = data;
            $scope.we_are = data;
          }).
          error(function(data, status, headers, config) {
                // $http.we_are = we_are;
                // $scope.we_are = $http.we_are[language];
                if ($http.we_are){
                    $scope.we_are = $http.we_are;
                }else {
                    alert_connection();
                }

                hideLoading();
        });

    }]
);


planetaBrasilControllers.controller('NewsCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/news";
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        //$scope.news = news;
        
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

       var api_url = API_ROOT_URL + '/api/news/' + '?lang=' + language;
      $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $scope.news = data;
          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });



    }]
);


planetaBrasilControllers.controller('ShowNewsCtrl', ['$scope', '$http', '$location',
    function ($scope, $rootScope, $location ) {
        var $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        //$scope.show_news = show_news;
        
        $scope.$on('$viewContentLoaded', function() {
            loading();
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

      var pk = $location.path().split('/')[2];
      $scope.url_local = "#/show-news/" + pk;
      var api_url = API_ROOT_URL + '/api/news/' + pk + '/?lang=' + language;
      $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
                hideLoading();
            $scope.show_news = data;
          }).
          error(function(data, status, headers, config) {
            hideLoading();
            alert('Ocorreu um erro. Tente novamente.')
        });

    }]
);




planetaBrasilControllers.controller('TableGamesCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $http = $rootScope;
        //$scope.matches = matches;
        language = window.localStorage.getItem('language');
        $scope.url_local = "#/table-games";
        if (language == 2) {
            $scope.th_match = "Day of the game";
            $scope.bg_img = "tabela-de-jogos_en.jpg"
            $scope.back = "Back";
        }else if (language == 3) {
            $scope.th_match = "DÍA DEL JUEGO";
            $scope.bg_img = "tabela-de-jogos_es.jpg"
            $scope.back = "Vuelta";
        }else {
            $scope.th_match = "DIA DO JOGO";
            $scope.bg_img = "tabela-de-jogos.jpg"
            $scope.back = "Voltar";
        }
        $scope.items = menu[language];
        
        $scope.$on('$viewContentLoaded', function() {
            loading();
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

       
      var api_url = API_ROOT_URL + '/api/matches_by_groups/' + '?lang=' + language;
      $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
                hideLoading();
                $scope.matches = data;
            }).
            error(function(data, status, headers, config) {
                hideLoading();
                alert('Ocorreu um erro. Tente novamente.')
            });
    }]
);




planetaBrasilControllers.controller('LastGamesCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $rootScope, $rootParams, $http ) {
        $http = $rootScope;
        $scope.url_local = "#/results/0";
        offset = $rootParams.offset;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        
        var api_url = API_ROOT_URL + '/api/last_games/' + '?lang=' + language + '&page=' + offset;
        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
                hideLoading();
                $scope.last_games = data;
                paginate = parseInt(data.total / 10);
                rest = data.total % 10;
                if (paginate > 0 && rest != 0) {
                    paginate += 1;
                }
                $scope.paginate = Array.apply(null, Array(paginate)).map(function (_, i) {return {"num": i+1, "id": i*10, "active": i*10 == offset};});
          }).
          error(function(data, status, headers, config) {
                hideLoading();
                alert('Ocorreu um erro. Tente novamente.')
        });


        $scope.$on('$viewContentLoaded', function() {
            loading();
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




planetaBrasilControllers.controller('ProgrammingCtrl', ['$scope', '$http', '$location',
    function ($scope, $rootScope, $location ) {
        var $http = $rootScope;
        language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        // $scope.programming = programming;
        
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

      var pk = $location.path().split('/')[2];
      $scope.url_local = "#/programming/" + pk;
      var api_url = API_ROOT_URL + '/api/venue/' + pk +'/?lang=' + language;
      $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $scope.programming = data;
          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });

    }]
);





planetaBrasilControllers.controller('FinalsCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/finals";
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        if (language == 2) {
            $scope.bg_img = "fases-finais_en.jpg";
            $scope.second = "Second stage";
            $scope.quater = "Quater-final";
            $scope.back = "Back";
        }else if (language == 3) {
            $scope.bg_img = "fases-finais_es.jpg";
            $scope.quater = "4ª de finais";
            $scope.second = "8ª de finais";
            $scope.back = "Vuelta";
        }else {
            $scope.bg_img = "fases-finais.jpg";
            $scope.second = "8ª de finais";
            $scope.quater = "4ª de finais";
            $scope.back = "Voltar";
        }
        //$scope.finals = finals[language];

        var api_url = API_ROOT_URL + '/api/finals/' + '?lang=' + language;
        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $scope.finals = data[language];
          }).
          error(function(data, status, headers, config) {
            alert('Ocorreu um erro. Tente novamente.')
        });
        
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
        var dropdown = document.querySelectorAll('.dropdown');
        var dropdownArray = Array.prototype.slice.call(dropdown,0);
        dropdownArray.forEach(function(el){
            var button = el.querySelector('a[data-toggle="dropdown"]'),
                    menu = el.querySelector('.dropdown-menu'),
                    arrow = button.querySelector('i.icon-arrow');
            button.addEventListener("click", function(e) {
                if(!menu.hasClass('show')) {
                    menu.classList.add('show');
                    menu.classList.remove('hide');
                    arrow.classList.add('open');
                    arrow.classList.remove('close');
                    event.preventDefault();
                }
                else {
                    menu.classList.remove('show');
                    menu.classList.add('hide');
                    arrow.classList.remove('open');
                    arrow.classList.add('close');
                    event.preventDefault();
                }
                e.preventDefault();
            });
        })

        Element.prototype.hasClass = function(className) {
            return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
        };
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.items, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       };
    }]
);





planetaBrasilControllers.controller('HomeCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        $scope.url_local = "#/home";
        // $scope.home = home;
        if (language == 2) {
            $scope.cultural_programming = "Cultural programme";
            $scope.places = "Interesting places";
            $scope.upcoming_matches = "Upcoming matches";
            $scope.guess_the_results = "Guess the results";
            $scope.latest_matches = "Latest matches";
            $scope.score_chart = "Score Chart";
        }else if (language == 3) {
            $scope.cultural_programming = "Programación Cultural";
            $scope.places = "Lugares de interés";
            $scope.upcoming_matches = "Próximos juegos";
            $scope.guess_the_results = "Adivinar Las Resulsts";
            $scope.score_chart = "Tabla de resultados";
            $scope.latest_matches = "Últimos juegos";
        }
        else {
            $scope.cultural_programming = "Programação Cultural";
            $scope.places = "Locais interessantes";
            $scope.upcoming_matches = "Próximos jogos";
            $scope.guess_the_results = "Dê seu Palpite";
            $scope.score_chart = "Tabela de resultados";
            $scope.latest_matches = "Últimos jogos";
        }
        var api_url = API_ROOT_URL + '/api/home/' + '?lang=' + language;
        reg_id = window.localStorage.getItem('reg_id');
        if (reg_id) {
            api_url = api_url + '&reg_id=' + reg_id;
        }
        var lat = window.localStorage.getItem('lat');
        var lng = window.localStorage.getItem('lng');
        if (lat && lng) {
            api_url = api_url + '&lat=' + lat + '&lng=' + lng;
        }
        var email = window.localStorage.getItem('email');
        if (email) {
            api_url = api_url + '&email=' + email;
        }
        var full_name = window.localStorage.getItem('full_name');
        if (full_name) {
            api_url = api_url + '&full_name=' + full_name;
        }

        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $http.home = data;
            $scope.home = data;
            hideLoading();
          }).
          error(function(data, status, headers, config) {
            // $http.home = home;
            if ($http.home){
                $scope.home = $http.home;
            }else {
                alert_connection();
            }
            hideLoading();
        });
        

        $scope.$on('$viewContentLoaded', function() {
            loading();
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
            elemets_programming = document.getElementsByClassName('input_checked_programming');
            ontouch(document.getElementById('cultural-programming'), function(evt, dir, phase, swipetype, distance){
                if (phase == 'end') {
                    event.stopPropagation();
                    if (dir == 'left'){
                        forward_element(elemets_programming);
                    };
                    if (dir == 'right') {
                        back_element(elemets_programming);
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
        
        $scope.showProgramming = function(id_programming) {
            window.location.href = "#programming/" + id_programming;
        }
        $scope.guess = function($event) {
            parent = $event.toElement.parentElement.parentElement;
            parent.className = "active";
        };
        $scope.guessSubmit = function($event) {
            form = $event.toElement.parentElement.parentElement;
            id = form.getAttribute('data-id');
            url = API_ROOT_URL + '/api/match/' + id;
            if (!form.elements.home.value || !form.elements.visited.value){
                alert('Favor conferir os campos');
                return
            }
            gols_home = parseInt(form.elements.home.value);
            gols_visited = parseInt(form.elements.visited.value);
            visited = "visited=" + form.elements.visited.value;
            home = "home=" + form.elements.home.value;
            email = "email=" + window.localStorage.getItem('email');
            name = "name=" + window.localStorage.getItem('full_name');
            data = [name, email, home, visited].join('&');
            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.send(data);
            // alert('Palpite enviado com sucesso!');
            guess_success = {
                1: "Palpite enviado com sucesso!",
                2: "Guess successfully sent!",
                3: "Palpite enviado com sucesso!"
            }
            var div = insertMessage(form, guess_success[language], 'message_guess');
        };
        $scope.activeMenu = function(item) {
            angular.forEach($rootScope.item, function(i) {
                i.status = 'deactive';
            });
            item.status = 'active';
            body.className = "";
       }
    }]
);

planetaBrasilControllers.controller('RankingGuessCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/ranking-guess";
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        
        if (language == 2) {
            $scope.title_page = "Ranking Guess";
        }else if (language == 3) {
            $scope.title_page = "Ranking Conjecture";
        }else {
            $scope.title_page = "Ranking Palpites";
        }
        $scope.$on('$viewContentLoaded', function() {
            // loading();
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

       var api_url = API_ROOT_URL + '/api/ranking-guesses/';
        $http({method: 'GET', url: api_url}).
            success(function(data, status, headers, config) {
            $http.ranking = data;
            $scope.ranking = data;
            hideLoading();
          }).
          error(function(data, status, headers, config) {
            // $http.ranking = ranking;
            if ($http.ranking){
                $scope.ranking = $http.ranking;
            }else {
                alert_connection();
            }
            hideLoading();
        });

    }]
);
planetaBrasilControllers.controller('AguiaVerdeCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.url_local = "#/aguia-verde";
        $http = $rootScope;
        var language = window.localStorage.getItem('language');
        $scope.items = menu[language];
        
        if (language == 2) {
            $scope.title_page = "Give a good destination";
            $scope.back = "Back";
            $scope.buy = "Compre sua muda";
        }else if (language == 3) {
            $scope.title_page = "Dé un buen destino";
            $scope.back = "Vuelta";
            $scope.buy = "Compre sua muda";
        }else {
            $scope.title_page = "Dê um bom destino";
            $scope.back = "Voltar";
            $scope.buy = "Compre sua muda";
        }
        $scope.$on('$viewContentLoaded', function() {
            // loading();
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
