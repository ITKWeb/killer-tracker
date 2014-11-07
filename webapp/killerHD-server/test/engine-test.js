'use strict';

var should = require('should');
var engine = require('../src/engine.js');


describe('Engine tests', function(){    
  describe('randomize method test', function(){
    var players;
    beforeEach(function(){
      players = [
          {name:'Alfred'},
          {name:'Bob'},
          {name:'Camille'},
          {name:'Dominique'},
          {name:'Enrietta'}
      ];
      engine.randomize(players);
    });
    it('a player should have a target and a killer property', function(){
        players.forEach(function(player){
          player.should.have.property('killer');
          player.should.have.property('target');
        });
    });        
    it('a player should never be his own target', function(){
        players.forEach(function(player){
          player.should.not.equal(player.target);
          player.should.not.equal(player.killer);
        });
    });
    it('all players should be only once the target of someone', function(){
        var killers = players.map(function(player){
          return player.killer;
        });      
        killers.forEach(function(killer, pos, self){
          pos.should.equal(self.indexOf(killer));
        });
    });
    it('The killer of A should have A as a target', function(){
        players.forEach(function(player){
          player.should.equal(player.killer.target);
          player.should.equal(player.target.killer);
        });
    });
  });
  
  describe('buildMissions method test', function(){
    var players,forfeits;
    beforeEach(function(){
      players = [
        {id:1},
        {id:2},
        {id:3},
        {id:4},
        {id:5}
      ];
      forfeits = [
        {id:1},
        {id:2},
        {id:3},
        {id:4}
      ];
      engine.randomize(players);
    });
    it('a player should have a target and a killer property', function(){
        players.forEach(function(player){
          player.should.have.property('killer');
          player.should.have.property('target');
        });
    });
  });
});