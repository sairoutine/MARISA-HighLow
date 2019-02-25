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

	// RPGアツマールでスクリーションショットが撮れるようにする
	if (window.RPGAtsumaru && window.RPGAtsumaru.experimental.screenshot && window.RPGAtsumaru.experimental.screenshot.setScreenshotHandler) {
		window.RPGAtsumaru.experimental.screenshot.setScreenshotHandler(function() {
			return new Promise(function(resolve, reject) {
				var base64 = mainCanvas.toDataURL("image/jpeg");
				resolve(base64);
			})
		})
	}

	// モバイル端末及び iOS simulator で、RPGアツマールだと、
	// なぜかゲームロードタイミングによって innerWidth, innerHeight がアツマールに設定したゲーム画面サイズにされてしまうので、
	// 最初にモバイル用サイズを設定し直す。
	if (window.RPGAtsumaru && isMobileDevice()) {
		window.innerWidth = screen.width;
		window.innerHeight = screen.height;
	}
	game.fullsize();

	game.startRun();
};

function isMobileDevice (){
	var r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return !!navigator.userAgent.match(r);
}

// for electron
if(window.require) {
	window.require('electron').webFrame.setVisualZoomLevelLimits(1,1); // unable to zoom
}
