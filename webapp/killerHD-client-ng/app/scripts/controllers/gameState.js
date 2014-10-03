/**
 * @ngdoc function
 * @name killerTrackerNgApp.controller:GameStateCtrl
 * @description
 * # GameStateCtrl
 * Controller of the killerTrackerNgApp
 */
angular.module('killerTrackerNgApp').controller('GameStateCtrl',  [
	'$scope', '$log', 'gameStateSrv',
function ($scope, $log, gameStateSrv) {
    
	'use strict';
	
	var player = {
		email: ''
	};

	$scope.title = 'Game State';
	$scope.player = player;
	
	
	$scope.showMeGameState = function () {
		$scope.missions = gameStateSrv.showMeGameState(player.email);
    };
	
  }
]);