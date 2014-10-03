'use strict';

<<<<<<< HEAD
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'itkkiller',
    password : 'itkkiller',
    database: 'itkkiller'
});
=======
var rethink = require("rethinkdb"),
    bluebird = require("bluebird");
>>>>>>> # 0.3 passage a rethinkdb, parce qu'on le vaut bien

var conf = {
    host: "localhost",
    port: 28015,
    authKey: "",
    db: "killerHD"
};

var connect = function connect() {
    return rethink.connect(conf).then(function(conn){
        console.log(conn);
        return conn;
    });
};

var savePlayers = function savePlayers(playerSet){
    console.log(playerSet);
    if(!Array.isArray(playerSet)){
        playerSet = [playerSet];
    }
    
    var conn = connect();
    conn.then(function (conn){
        console.log(playerSet);
        playerSet.forEach( function (data){
            rethink.table('Player').insert(data).run(conn);
        });
    }).done();
};

module.exports = {
    connect: connect,
    savePlayers: savePlayers,
};

/*
        db.connect().bind(this);
        for (var i = 0; i < data.length; i++) {
            db.insertPlayer(data[i]);
        }*/
