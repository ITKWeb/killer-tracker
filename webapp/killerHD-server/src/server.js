'use strict';
var koa = require('koa'),
    serve = require('koa-static'),
    http = require('http'),
    path = require("path"),
    io = require('socket.io'),
    db = require('./db.js'),
    mailService = require('./mail_service'),
    engine = require('./engine.js'),
    CronJob = require('cron').CronJob;

var port = process.argv[2] || 8888;


var launch = true;

console.log("[INFO] Launching KillerHD-server...");

var app = koa();

console.log("[INFO] __dirname : " + __dirname );

app.use(function*(next){
    console.log("[INFO] starting serving : " + this.originalUrl );
    yield next;
    console.log("[INFO] ending serving");    
});

app.use(serve(path.resolve(__dirname, '../../killerHD-client-ng/app/')));

app.listen(port);

console.log("[INFO] \t... Static file server running at http://localhost:" + port + "/");

var server = http.Server(app.callback()),
    ioserver = io(server);

ioserver.on('connection', function(socket) {
    console.log("[INFO] \t... Incoming connection");
    socket.on('new_game', function(players) {
        var data = {
            players: players,
            startDate: getCurrentDate()
        };
        db.createNewGame(data);
        players.forEach(function(player){
            console.log(player);
            mailService.firstMail(player);
        });
    });
    socket.on('save_forfeit', function(data) {
        db.saveForfeit(data);
    });
    socket.on('valid_death', function(data) {
        db.validDeath(data.email, data.password);
       // mailService.mailValidDeath(data.email);
    });
    socket.on('players_request', function(){
        var players = db.getPlayers().then(function(cursor){
            cursor.toArray(function(err, players){
                if(err) throw err;
                console.log(players);
                socket.emit('players', players);
            });
        });        
    });
});

server.listen(++port);

console.log("[INFO] \t... Socket connections at http://localhost:" + port + "/");

console.log("[INFO] \t ...Listening on websockets.");


var getCurrentDate = function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = mm+'/'+dd+'/'+yyyy;
    return today;
}
//LAUNCH GAME

var game = db.getCurrentGame().then(function(cursor){
    cursor.toArray(function(err, games){
        if(err) throw err;
        engine.nextStep(games[0].id);
        new CronJob('* * * * * *', function() {
            engine.nextStep(games[0].id);
        }, null, true, 'America/Los_Angeles');
    });
});



