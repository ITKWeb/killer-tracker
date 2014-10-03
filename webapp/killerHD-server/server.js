'use strict';

var http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs"),
io = require('socket.io'),
db = require('./db.js'),    
port = process.argv[2] || 8888;

console.log("[INFO] Launching KillerHD-server...");

var server = http.createServer(function(request, response) {
 
    var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename = '../killerHD-client/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
});

server.listen(parseInt(port, 10));
console.log("[INFO] \t... Static file server running at http://localhost:" + port + "/");

console.log("[INFO] Opening websockets...");
var webSocket = io.listen(server);
webSocket.on('connection', function(socket) {
    socket.on('save_player', function(data) {
        for (var i = 0; i < data.length; i++) {
            db.insertPlayer(data[i]);
        }
    });
});
console.log("[INFO] \t ...Listening on websockets.");

console.log("[INFO] Connecting to Mysql...");
db.connect();
