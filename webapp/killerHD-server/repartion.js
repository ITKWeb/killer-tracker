'use strict';
var db = require('./db.js');

var run = function run (game){
    
    var alivePlayers = db.getAllAlivePlayers(game);
    var forfeits = db.getAllForfeits();
    
    var killer, target, forfeit;
    
    alivePlayers = randomizeArray(alivePlayers);
    for(var i = 0; i < alivePlayers.length; i++){
        killer = alivePlayers[i];
        target = alivePlayers[(i+1) % alivePlayers.length];
        //TODO: voir si y'a pas mieux pour choisir un gage
        var forfeitIndex = Math.floor(Math.random() * forfeits.length);
        forfeit = forfeits[forfeitIndex];
        db.saveMission({game: game.id, killer : killer.id, target: target.id, forfeit: forfeit.id, status:'PENDING'});
        
    }
    
};

function randomizeArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.export = run;