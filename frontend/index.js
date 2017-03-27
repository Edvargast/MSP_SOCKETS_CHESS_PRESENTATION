var ChessBoard = require("chessboardjs")
var Chess  = require('chess.js').Chess

var config = {
    draggable: true, // piece interaction
    position: 'start', // starting configuration
    onDrop: handleMove, // call this function
}

board = ChessBoard('board', config)

game = new Chess()

var handleMove = function(source, target) {
	var move = game.move({from:source, to:target})
}