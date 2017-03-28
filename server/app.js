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

games = {}
queue = []
id = 0
gameId = 0
io.on('connection', function(socket) {
    console.log('New connection');
    
    assignId(socket)
    if (queue.length > 0){
    	startGame(socket, queue.pop())
    	socket.emit('gameStarted','w')
    	games[socket.gid].black.emit('gameStarted','b')
    } else {
    	queue.push(socket)
    }

    socket.on('move', function(msg) {
        getOpponent(socket).emit('move', msg)
    })

    socket.on('disconnect',function(){
        console.log('dc')
        opp = getOpponent(socket)
        // opp.emit('dc')
        opp.disconnect()
        games[socket.gid] = undefined
    })

})



function assignId(socket){
	socket.userId = id
	id++
}
function getOpponent(socket){
    return socket.userId === games[socket.gid].white.userId ? games[socket.gid].black : games[socket.gid].white
}

function startGame(s1,s2){
	s1.gid = gameId
	s2.gid = gameId
	games[gameId] = {
		white:s1,
		black:s2
	}
	gameId++
}