var planetaBrasilApp = angular.module('planetaBrasilApp', [
  'ngRoute',
  'planetaBrasilControllers'
]);
 
planetaBrasilApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }).
      when('/news', {
        templateUrl: 'templates/news.html',
        controller: 'NewsListCtrl'
      }).
      when('/news/:NewsId', {
        templateUrl: 'templates/phone-detail.html',
        controller: 'NewsDetailCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);