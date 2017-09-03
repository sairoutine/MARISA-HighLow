'use strict';
var Game = require('./game');

var game;

window.onload = function() {
	var mainCanvas = document.getElementById('mainCanvas');

	var options = {};

	game = new Game(mainCanvas, options);

	game.setupEvents();
	game.init();
	game.startRun();
};

// for electron
if(window.require) {
	window.require('electron').webFrame.setVisualZoomLevelLimits(1,1); // unable to zoom
}
