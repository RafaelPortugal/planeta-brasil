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
      when('/next-matches', {
        templateUrl: 'templates/next-matches.html',
        controller: 'NextMatchesCtrl'
      }).
      when('/matches-results/', {
        templateUrl: 'templates/matches-results.html',
        controller: 'MatchesResultsCtrl'
      }).
      when('/groups', {
        templateUrl: 'templates/groups.html',
        controller: 'GroupsCtrl'
      }).
      when('/finals', {
        templateUrl: 'templates/finals.html',
        controller: 'FinalsCtrl'
      }).
      when('/photos', {
        templateUrl: 'templates/photos.html',
        controller: 'PhotosCtrl'
      }).
      when('/videos', {
        templateUrl: 'templates/videos.html',
        controller: 'VideosCtrl'
      }).
      when('/guess', {
        templateUrl: 'templates/guess.html',
        controller: 'GuessCtrl'
      }).
      when('/estadiums', {
        templateUrl: 'templates/stadiums.html',
        controller: 'StadiumsCtrl'
      }).
      when('/places', {
        templateUrl: 'templates/places.html',
        controller: 'PlacesCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);