var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = 3000;

http.listen(port, function() {
    console.log('listening on *: ' + port);
});
// setup my socket server
var io = require('socket.io')(http);

waiting = []
id = 0

io.on('connection', function(socket) {
    console.log('New connection');

    socket.on('move', function(msg) {
    	console.log("MOVE")
       	socket.broadcast.emit('move', msg);
    })
})