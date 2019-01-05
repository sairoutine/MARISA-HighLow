'use strict';
var Core = require('./hakurei').Core;
var Util = require('./hakurei').Util;

var SceneWarnings = require('./scene/warnings');
var SceneLoading = require('./scene/loading');
var SceneRule = require('./scene/rule');
var SceneDuel = require('./scene/duel');
var SceneClear = require('./scene/clear');
var SceneExClear = require('./scene/ex_clear');
var CONSTANT = require('./constant');

var Assets = require('./assets');

var Game = function(canvas) {
	Core.apply(this, arguments);

	this.is_finish_tutorial = false;

	this.scene_manager.addScene("loading", new SceneLoading(this));
	this.scene_manager.addScene("warnings", new SceneWarnings(this));
	this.scene_manager.addScene("rule", new SceneRule(this));
	this.scene_manager.addScene("duel", new SceneDuel(this));
	this.scene_manager.addScene("clear", new SceneClear(this));
	this.scene_manager.addScene("ex_clear", new SceneExClear(this));
};
Util.inherit(Game, Core);

Game.prototype.init = function () {
	Core.prototype.init.apply(this, arguments);

	this.is_finish_tutorial = false;

	this.scene_manager.changeScene("loading", Assets, "warnings");

	// デバッグ用画面遷移
	if (CONSTANT.DEBUG) {
		this.scene_manager.changeScene("loading", Assets, CONSTANT.DEBUG_SCENE);
	}
};

Game.prototype.setupDebug = function (dom) {
	if (!CONSTANT.DEBUG) return;

	this.debug_manager.setOn(dom);

	// ゲームスタート ボタン
	this.debug_manager.addMenuButton("Run", function (game) {
		game.startRun();
	});

	// ゲームストップ ボタン
	this.debug_manager.addMenuButton("Stop", function (game) {
		game.stopRun();
	});

	// キャプチャボタン
	this.debug_manager.addCaputureImageButton("画面キャプチャ");

	this.debug_manager.addMenuButton("FPS表示", function (game) {
		game.debug_manager.setShowingFpsOn();
	});
	this.debug_manager.addMenuButton("FPS非表示", function (game) {
		game.debug_manager.setShowingFpsOff();
	});
};



module.exports = Game;
