var ChessBoard = require("chessboardjs")
var Chess  = require('chess.js').Chess
var socket = require('socket.io-client')()

var board, game;

var initGame = function (){
	var config = {
	    draggable: true, // piece interaction
	    position: 'start', // starting configuration
	    onDrop: handleMove, // call this function
	}

	board = ChessBoard('board', config)

	game = new Chess()

	console.log('test')
	
	socket.on('move', function(msg){
		console.log('recieved move')
		game.move(msg)
		// fen is stringified version of game
		board.position(game.fen(), false)
	})
}

var handleMove = function(source, target) {
	var move = game.move({from:source, to:target})
	if(move){
		socket.emit('move', move)
	} else {
		console.log('illegal')
		// when snapback returned, will return piece
		return 'snapback'
	}
}


initGame()