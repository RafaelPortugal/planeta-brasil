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
      when('/results/:offset', {
         templateUrl: 'templates/last_games.html',
         controller: 'LastGamesCtrl'
      }).
      when('/curiosity', {
        templateUrl: 'templates/curiosity.html',
        controller: 'CuriosityCtrl'
      }).
      when('/photo-fans', {
        templateUrl: 'templates/photo_fans.html',
        controller: 'PhotoFansCtrl'
      }).
      when('/players-by-team/:teamId', {
        templateUrl: 'templates/players_by_team.html',
        controller: 'PlayersByTeamCtrl'
      }).
      when('/stadiums', {
        templateUrl: 'templates/stadiums.html',
        controller: 'StadiumsCtrl'
      }).
      when('/stadium/:stadiumId', {
        templateUrl: 'templates/stadium.html',
        controller: 'StadiumCtrl'
      }).
      when('/show-news/:newsId', {
        templateUrl: 'templates/show_news.html',
        controller: 'ShowNewsCtrl'
      }).
      when('/news', {
        templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
      }).
      when('/table-games', {
        templateUrl: 'templates/table_games.html',
        controller: 'TableGamesCtrl'
      }).
      when('/finals', {
        templateUrl: 'templates/finals.html',
        controller: 'FinalsCtrl'
      }).
      when('/team-per-group', {
        templateUrl: 'templates/team_per_group.html',
        controller: 'TeamPerGroupCtrl'
      }).
      when('/world-championship', {
        templateUrl: 'templates/world_championship.html',
        controller: 'WorldChampionshipCtrl'
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