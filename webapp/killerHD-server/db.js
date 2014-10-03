'use strict';

var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'itkkiller',
    password : 'itkkiller',
    database: 'itkkiller'
});


var connect = function() {
    connection.connect(function(err) {
        if(err){
            console.log("[ERROR] \t ...Mysql connection FAILED.");
        }else{
            console.log("[INFO] \t ...Mysql connected.");
        }
    });
};

var insertPlayer = function(playerSet){
    var query = connection.query('INSERT INTO Player SET ?', playerSet, function(err, result) {
        if(err){
            console.log("[ERROR] Error during insertPlayer query :");
            console.log(err);
        }else{
            console.log('[INFO] Inserted player ' + playerSet.name);
        }
    });
};

module.exports = {
    connect: connect,
    insertPlayer: insertPlayer,
};

