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
 
planetaBrasilControllers.controller('HomeCtrl', ['$scope', '$http',
    function ($scope, $http) {
    // $http.get('templates/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });
 
       $scope.$on('$viewContentLoaded', function() {
            // forward.addEventListener("click", function(e) {
            // forward_element(elemets_banner);
            // e.preventDefault();
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
            swipe_menu();
        });
    }]
    
);
 
// planetaBrasilControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
//   function($scope, $routeParams) {
//     $scope.phoneId = $routeParams.phoneId;
//   }]);