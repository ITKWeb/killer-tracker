angular.module('killerTrackerNgApp').factory('gameStateSrv', [
  '$log',
  function($log) {

    'use strict';
	
	var adminMissions = [
		{
			killer: {email: 'nelly@itkweb.com'},
			player: {email: 'player1@itkweb.com'}, 
			forfeit : {title : 'Check what you eat !', description : 'You must make your target eat an expired yogourt'},
			status : 'pending'
		},
		{
			killer: {email: 'michele@itkweb.com'},
			player: {email: 'player2@itkweb.com'}, 
			forfeit : {title : 'Singing in the rain !', description : 'You must sing Cadet Roussel to your target'},
			status : 'done'
		},
		{
			killer: {email: 'jeremy@itkweb.com'},
			player: {email: 'player3@itkweb.com'}, 
			forfeit : {title : 'Socks killer !', description : 'You must kill your target with your socks'},
			status : 'pending'
		},
		{
			killer: {email: 'marc@itkweb.com'},
			player: {email: 'player4@itkweb.com'}, 
			forfeit : {title : 'Happy birthday !', description : 'Your target must wish you an happy birthday'},
			status : 'pending'
		}
		
	];
	
	var playerMissions = [
		{
			killer: {email: 'nelly@itkweb.com'},
			player: {email: 'player1@itkweb.com'}, 
			forfeit : {title : 'Check what you eat !', description : 'You must make your target eat an expired yogourt'},
			status : 'pending'
		},
		{
			killer: {email: 'michele@itkweb.com'},
			player: {email: 'player2@itkweb.com'}, 
			forfeit : {title : 'Singing in the rain !', description : 'You must sing Cadet Roussel to your target'},
			status : 'done'
		}
	];
    
    return {
		showMeGameState: function(email) {
			if (email === 'jeremy@itkweb.com') {
				return adminMissions;
			} else if (email === 'nelly@itkweb.com') {
				return playerMissions;
			}
		}
    };
  }
]);