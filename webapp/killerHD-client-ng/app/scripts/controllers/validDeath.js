'use strict';

/**
 * @ngdoc function
 * @name killerTrackerNgApp.controller:ValidDeathCtrl
 * @description
 * # ValidDeathCtrl
 * Controller of the killerTrackerNgApp
 */
angular.module('killerTrackerNgApp')
  .controller('ValidDeathCtrl', function ($scope) {
    $scope.title = 'Validate Death';
      
    //Ugly !!!  
    var port = parseInt(window.document.location.port) + 1;
    var socket = io.connect('http://127.0.0.1:' + port);
      
    $scope.validDeath = function(pEmail, pPassword) {
        var data = {
            email : pEmail,
            password : pPassword
        };
        socket.emit('valid_death', data);
    };
      
  });
