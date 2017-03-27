var ChessBoard = require("chessboardjs")
var Chess  = require('chess.js').Chess
var socket = require('socket.io-client')()

var board, game, color;

var initGame = function (){
	var config = {
	    draggable: true, // piece interaction
	    position: 'start', // starting configuration
	    onDrop: handleMove, // call this function
	}

	board = ChessBoard('board', config)

	game = new Chess()

	socket.on('move', function(msg){
		console.log('recieved move')
		game.move(msg)
		// fen is stringified version of game
		board.position(game.fen(), false)
	})
}

var handleMove = function(source, target, piece) {
	if(piece[0] != color){
		return 'snapback'
	}

	var move = game.move({from:source, to:target})
	
	if(move){
		socket.emit('move', move)
	} else {
		console.log('illegal')
		// when snapback returned, will return piece
		return 'snapback'
	}
}

socket.on('gameStarted',function(msg){
	color = msg
	initGame()
	document.getElementById('status').innerHTML = 'Color: ' + color
})