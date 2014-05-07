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
        $scope.$on('$viewContentLoaded', function() {
            if (window.localStorage.getItem('language')){
                alert("Salvou o language");
            }else {
                alert("Não tinha language");
            };
        });
    }]
);


planetaBrasilControllers.controller('LoadingCtrl', ['$scope', '$http',
    function ($scope, $rootScope, $http ) {
        $scope.$on('$viewContentLoaded', function() {
            alert('Get json home');
            window.location.href = "#home";
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