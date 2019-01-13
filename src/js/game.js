'use strict';
var Core = require('./hakurei').Core;
var Util = require('./hakurei').Util;

var SceneLoadingPreload = require('./hakurei').Scene.Loading;
var SceneLoadingAll = require('./scene/loading');
var SceneRule = require('./scene/rule');
var SceneDuel = require('./scene/duel');
var SceneClear = require('./scene/clear_normal');
var SceneClearEx = require('./scene/clear_ex');
var CONSTANT = require('./constant');

var AssetsPreload = require('./assets_preload');

var Game = function(canvas) {
	Core.apply(this, arguments);

	this.is_finish_tutorial = false;

	this.scene_manager.addScene("loading_preload", new SceneLoadingPreload(this));
	this.scene_manager.addScene("loading_all", new SceneLoadingAll(this));
	this.scene_manager.addScene("rule", new SceneRule(this));
	this.scene_manager.addScene("duel", new SceneDuel(this));
	this.scene_manager.addScene("clear", new SceneClear(this));
	this.scene_manager.addScene("clear_ex", new SceneClearEx(this));
};
Util.inherit(Game, Core);

Game.prototype.init = function () {
	Core.prototype.init.apply(this, arguments);

	this.is_finish_tutorial = false;

	// ローディング用素材の読み込み用ローディング画面へ
	this.scene_manager.changeScene("loading_preload", AssetsPreload, "loading_all");
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

	// FPS 表示
	this.debug_manager.addMenuButton("FPS表示", function (game) {
		game.debug_manager.setShowingFpsOn();
	});
	this.debug_manager.addMenuButton("FPS非表示", function (game) {
		game.debug_manager.setShowingFpsOff();
	});

	// 金額増加
	this.debug_manager.addMenuButton("所持金を2倍にする", function (game) {
		if(game.scene_manager.currentScene() instanceof SceneDuel) {
			game.scene_manager.currentScene().rule_manager.twiceMoney();
		}
		else {
			window.alert("ゲームが始まってから押してください");
		}
	});

};

module.exports = Game;
