var ChessBoard = require("chessboardjs")
var Chess  = require('chess.js').Chess
var socket = require('socket.io-client')()

var initGame = function (){
	var config = {
	    draggable: true, // piece interaction
	    position: 'start', // starting configuration
	    onDrop: handleMove, // call this function
	}

	board = ChessBoard('board', config)

	game = new Chess()	
}

var handleMove = function(source, target) {
	var move = game.move({from:source, to:target})
	socket.emit('message',source + " --> " + target)
}


initGame()