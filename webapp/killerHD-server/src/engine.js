'use strict';

var db = require('./db');

//next game step
var nextStep = function nextStep(gameId){
    
    var players = db.getPlayers(gameId);
    randomize(players);
  
    var forfeits = db.getForfeits();
    var missions = buildMissions(players, forfeits);
  // TODO
    db.saveMissions(missions);
};

var randomize = function randomize(players){
  
    var nbPlayers = players.length;
    players.forEach(function (player, i){
      player.target = players[(i + 1) % nbPlayers];
      player.target.killer = player;
    });
  
    var max_change = Math.floor(players.size * 10);
    
    for (var i = 0; i < max_change; i++){
        
        //randomly picking a killer to change its target
        var new_killer_index = Math.floor(Math.random() * players.length);
        //picking a new target for our killer
        var new_target_index = Math.floor(Math.random() * players.length - 1);
        //random magic to avoid killer = target
        if(new_target_index >= new_killer_index){
            new_target_index++;
        }

        //getting objects from list
        var newKiller = players[new_killer_index];
        var newTarget = players[new_target_index];

        //saving the target of killer before change
        var oldTarget = newKiller.target;
        //saving the killer of the new target before change
        var oldKiller = newTarget.killer;

        //this case is possible and we don't want it to happen
        //because a player is excluded of the game
        if(oldTarget !== oldKiller){
            //setting
            newKiller.target = newTarget;
            newTarget.killer = newKiller;

            oldKiller.target = oldTarget;
            oldTarget.killer = oldKiller;
        }
    }

};

var buildMissions = function buildMissions(players, forfeits){
    var missions = [];
    var forfeitsToPick = forfeits.slice(0);
    players.forEach(function(player) {
      //pick a random forfeit
      var forfeit_index = Math.floor(Math.random() * players.forfeitsToPick);
      var forfeit = forfeitsToPick[forfeit_index];
      forfeitsToPick.splice(forfeit_index, 1);
      if(forfeitsToPick.length <= 0){
        forfeitsToPick = forfeits.slice(0);
      }
      missions.push(
        {forfeit: forfeit.id, killer: player.id, player: player.target.id, status: 'PENDING'}
      );
    });
};

module.exports = {
    nextStep: nextStep,
    randomize: randomize,
    buildMissions: buildMissions
};