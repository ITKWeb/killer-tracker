'use strict';

var rethink = require("rethinkdb"),
    bluebird = require("bluebird");

var conf = {
    host: "localhost",
    port: 28015,
    authKey: "",
    db: "killerHD"
};

var connect = function connect() {
    return rethink.connect(conf).then(function(conn){
        return conn;
    });
};

var createNewGame = function createNewGame(data){
    
    var players = data.players;
    if(!Array.isArray(players)){
        players = [players];
    }
    
    var conn = connect();
    var result = conn.then(function (conn){
        return rethink.table('Game').insert({startDate: data.startDate}).run(conn);
    });
    
    bluebird.all([conn, result]).then(function (array){
        var conn = array[0];
        var result = array[1];
        players.forEach( function (player){
            player.game_id = result.generated_keys[0];
            return rethink.table('Player').insert(player).run(conn);
        });
    }).done();
};

var saveForfeits = function saveForfeits(data){
    
    if(!Array.isArray(data)){
        data = [data];
    }
    var conn = connect();
    conn.then(function (conn){
        data.forEach(function(forfeit) {
            return rethink.table('Forfeit').insert(forfeit).run(conn);
        });
    }).done();
};

module.exports = {
    createNewGame: createNewGame,
    saveForfeits: saveForfeits
};
