function LeftMenu($scope) {
    $scope.itens = [
        {href: '#/home', title: 'Home', status: 'active', language: 1},
        {href: '#/news', title: 'News', status: 'deactive', language: 1},
        {href: '#/next-matches', title: 'Proximas Partidas', status: 'deactive', language: 1},
        {href: '#/matches-results', title: 'Resultados das Partidas', status: 'deactive', language: 1},
        {href: '#/groups', title: 'Fase de Grupos', status: 'deactive', language: 1},
        {href: '#/finals', title: 'Fase Final', status: 'deactive', language: 1},
        {href: '#/photos', title: 'Fotos', status: 'deactive', language: 1},
        {href: '#/videos', title: 'Videos', status: 'deactive', language: 1},
        {href: '#/guess', title: 'Palpite', status: 'deactive', language: 1},
        {href: 'http://www.google.com.br', title: 'aguia-verde', status: 'deactive', language: 1},
        {href: '#/estadiums', title: 'Estadios', status: 'deactive', language: 1},
        {href: '#/places', title: 'Pontos turísticos', status: 'deactive', language: 1},
    ];
    $scope.activeMenu = function(item) {
    	angular.forEach($scope.itens, function(i) {
    		i.status = 'deactive';
    	});
    	item.status = 'active';
    }
}


var planetaBrasilControllers = angular.module('planetaBrasilControllers', []);
 
planetaBrasilControllers.controller('HomeCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
       $scope.$on('$viewContentLoaded', function() {
            forward = document.getElementById("forward");
            back = document.getElementById("back");
            forward.addEventListener("click", function(e) {
                forward_element(elemets_banner);
                e.preventDefault();
            });
            back.addEventListener("click", function(e) {
                back_element(elemets_banner);
                e.preventDefault();
            });
            closeMenu();
        });
    }]
);

planetaBrasilControllers.controller('NewsListCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('NextMatchesCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('MatchesResultsCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('GroupsCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('FinalsCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('PhotosCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('VideosCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);


planetaBrasilControllers.controller('GuessCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);

planetaBrasilControllers.controller('AguiaVerdeCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);

planetaBrasilControllers.controller('StadiumsCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);

planetaBrasilControllers.controller('PlacesCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
    // $scope.orderProp = 'age';
        $scope.$on('$viewContentLoaded', function() {
            closeMenu();
        });
    }]
    
);

