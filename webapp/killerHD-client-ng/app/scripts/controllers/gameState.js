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
          
    //Ugly !!!  
    var port = parseInt(window.document.location.port) + 1;
    var socket = io.connect('http://127.0.0.1:' + port);
    
    socket.on('players', function(players) {
        $scope.$apply(function() {
            $scope.players = players;
        });
    });
    
    socket.emit('players_request');
    
    
  }
]);