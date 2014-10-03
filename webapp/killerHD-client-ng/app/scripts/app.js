'use strict';

/**
 * @ngdoc overview
 * @name killerTrackerNgApp
 * @description
 * # killerTrackerNgApp
 *
 * Main module of the application.
 */
angular
  .module('killerTrackerNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
	  .when('/launchGame', {
        templateUrl: 'views/launchGame.html',
        controller: 'LaunchGameCtrl'
      })
	  .when('/createForfeit', {
        templateUrl: 'views/createForfeit.html',
        controller: 'CreateForfeitCtrl'
      })
	  .when('/gameState', {
        templateUrl: 'views/gameState.html',
        controller: 'GameStateCtrl'
      })
	  .when('/validDeath', {
        templateUrl: 'views/validDeath.html',
        controller: 'ValidDeathCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
