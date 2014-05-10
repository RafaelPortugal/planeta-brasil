function LeftMenu($scope) {
    $scope.itens = [
        {href: '#/home', title: 'Home', status: 'active', language: 1},
        {href: '#/news', title: 'News', status: 'deactive', language: 1},
    ];
    $scope.activeMenu = function(item) {
    	angular.forEach($scope.itens, function(i) {
    		i.status = 'deactive';
    	});
    	item.status = 'active';
    }
}


var planetaBrasilControllers = angular.module('planetaBrasilControllers', []);

planetaBrasilControllers.controller('LanguageCtrl', ['$scope', '$http',
    function ($scope, $http ) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
        $scope.chooseLanguage = function(id_language) {
            window.localStorage.setItem('language', id_language);
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
        }else {
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
        if (window.localStorage.getItem('language') == 2) {
            message = "Wait, we are carrying the information of your city."
        }else {
            message = "Aguarde, estamos carregando as informações da sua cidade.";
        }

        $scope.message = message;
        $scope.$on('$viewContentLoaded', function() {
            setTimeout(function(){
                window.location.href = "#home";
            },4000);
        });
    }]
);

planetaBrasilControllers.controller('HomeCtrl', ['$scope', '$http',
    function ($scope, $http ) {
        $scope.$on('$viewContentLoaded', function() {
            
            body = document.body;
            width = body.offsetWidth
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
    }]
);