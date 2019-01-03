'use strict';
var Game = require('./game');
var CONSTANT = require('./constant');

var game;

window.onload = function() {
	var mainCanvas = document.getElementById('mainCanvas');

	var options = {};

	game = new Game(mainCanvas, options);

	game.init();
	// デバッグ設定
	if (CONSTANT.DEBUG) {
		var debugDOM = document.getElementById('debug');
		game.setupDebug(debugDOM);
	}
	game.setupEvents();
	game.fullsize();
	game.startRun();
};

// for electron
if(window.require) {
	window.require('electron').webFrame.setVisualZoomLevelLimits(1,1); // unable to zoom
}
