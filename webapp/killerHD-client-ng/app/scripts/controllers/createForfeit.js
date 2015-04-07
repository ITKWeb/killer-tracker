'use strict';

/**
 * @ngdoc function
 * @name killerTrackerNgApp.controller:CreateForfeitCtrl
 * @description
 * # CreateForfeitCtrl
 * Controller of the killerTrackerNgApp
 */
angular.module('killerTrackerNgApp')
  .controller('CreateForfeitCtrl', function ($scope) {
      
    $scope.title = 'Create Forfeit';
    
    //Ugly !!!  
    var port = parseInt(window.document.location.port) + 1;
    var socket = io.connect('http://127.0.0.1:' + port);
      
    $scope.save = function(forfeit) {
        socket.emit('save_forfeit', forfeit);
    };
      
  });
