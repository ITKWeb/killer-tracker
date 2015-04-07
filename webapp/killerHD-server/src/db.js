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

var saveForfeit = function saveForfeit(data){
    
    var conn = connect();
    conn.then(function (conn){
        return rethink.table('Forfeit').insert(data).run(conn);
    }).done();
};

var saveMissions = function saveMissions(data){
    
    if(!Array.isArray(data)){
        data = [data];
    }
    var conn = connect();
    conn.then(function (conn){
        data.forEach(function(mission) {
            return rethink.table('Mission').insert(mission).run(conn);
        });
    }).done();
};

var getPlayers = function getPlayers(gameId){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Player').run(conn);
    });
}

var getAlivePlayers = function getAlivePlayers(gameId){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Player').filter({alive: true}).run(conn);
    });
}

var getPlayer = function getPlayer(playerId){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Player').filter({id: playerId}).run(conn);
    });
}

var getForfeits = function getForfeits(){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Forfeit').run(conn);
    });
}

var getForfeit = function getForfeit(forfeitId){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Forfeit').filter({id: forfeitId}).run(conn);
    });
}

var getCurrentGame = function getCurrentGame(){
    var conn = connect();
    return conn.then(function (conn){
        return rethink.table('Game').run(conn);
    });
}

var validDeath = function validDeath(email, password){
    console.log("Valid death query: ", email);
    var conn = connect();
    var promise = conn.then(function (conn){
        return rethink.table('Player').filter({"email":email}).run(conn);
    });
    promise.then(function(cursor){
        cursor.toArray(function(err, players){
            var player = players[0];
            if(err) throw err;
            console.log("Got player:", player);
            console.log("Checking passwords: ", player.password, password);
            if(player.password == password){
                console.log("Player has been slayed: ", email);
                conn = connect();
                return conn.then(function (conn){
                    return rethink.table('Player').filter({"email":email}).update({"alive":"false"}).run(conn);
                });
            }
        });
    });

}

module.exports = {
    createNewGame: createNewGame,
    saveForfeit: saveForfeit,
    getCurrentGame: getCurrentGame,
    getPlayers: getPlayers,
    getAlivePlayers: getAlivePlayers,
    getForfeits: getForfeits,
    saveMissions: saveMissions,
    getPlayer: getPlayer,
    getForfeit: getForfeit,
    validDeath: validDeath
};
