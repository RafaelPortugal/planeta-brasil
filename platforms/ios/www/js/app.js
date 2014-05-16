var planetaBrasilApp = angular.module('planetaBrasilApp', [
  'ngRoute',
  'planetaBrasilControllers'
]);
 
planetaBrasilApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/language', {
        templateUrl: 'templates/language.html',
        controller: 'LanguageCtrl'
      }).
      when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }).
      when('/loading', {
        templateUrl: 'templates/loading.html',
        controller: 'LoadingCtrl'
      }).
      when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: function() {
          if (window.localStorage.getItem('language')){
              return '/loading';
          }else {
              return '/language';
          };
        }
      });
  }]);