'use strict';
var koa = require('koa'),
    serve = require('koa-static'),
    http = require('http'),
    path = require("path"),
    io = require('socket.io'),
    db = require('./db.js');


var port = process.argv[2] || 8888;

console.log("[INFO] Launching KillerHD-server...");

var app = koa();

console.log("[INFO] __dirname : " + __dirname );

app.use(function*(next){
    console.log("[INFO] starting serving : " + this.originalUrl );
    yield next;
    console.log("[INFO] ending serving");    
});

app.use(serve(path.resolve(__dirname, '../killerHD-client')));

app.listen(port);

console.log("[INFO] \t... Static file server running at http://localhost:" + port + "/");

var server = http.Server(app.callback()),
    ioserver = io(server);

ioserver.on('connection', function(socket) {
    console.log("[INFO] \t... Incoming connection");
    socket.on('save_player', function(data) {
        for (var i = 0; i < data.length; i++) {
            db.insertPlayer(data[i]);
        }
    });
});

server.listen(++port);

console.log("[INFO] \t... Socket connections at http://localhost:" + port + "/");


console.log("[INFO] \t ...Listening on websockets.");

console.log("[INFO] Connecting to Mysql...");
db.connect();
