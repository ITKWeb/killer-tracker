'use strict';

/**
 * @ngdoc function
 * @name killerTrackerNgApp.controller:LaunchGameCtrl
 * @description
 * # LaunchGameCtrl
 * Controller of the killerTrackerNgApp
 */
angular.module('killerTrackerNgApp')
  .controller('LaunchGameCtrl', ['$scope', function ($scope) {
    
    $scope.title = 'Launch Game';

    $scope.players = [{}];
    
    console.log($scope.players);

    $scope.add = function(player) {
    	//console.log(newplayer.email);
    	player.isAdded = true;
    	$scope.players.push({}); 
    	console.log($scope.players);
    };

    $scope.remove = function(index) {
    	
    	console.log('remove ' , index);
    	$scope.players.splice(index,1);
		
    };

  }]);
