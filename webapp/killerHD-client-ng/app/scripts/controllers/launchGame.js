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

    $scope.players = [];  
    $scope.newplayer = {};

    $scope.add = function(newplayer) {
        var password = Math.floor(Math.random() * 10000000);
        newplayer.password = password;
        newplayer.alive = true;
    	$scope.players.push(newplayer); 
    	console.log(newplayer);
        $scope.newplayer = {};
    };

    $scope.remove = function(index) {
    	
    	console.log('remove ' , index);
    	$scope.players.splice(index,1);
		
    };
      
          //Ugly !!!  
    var port = parseInt(window.document.location.port) + 1;
    var socket = io.connect('http://127.0.0.1:' + port);
      
    $scope.startGame = function startGame(){
        socket.emit('new_game', $scope.players);  
    };

  }]);
