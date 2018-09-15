'use strict';
var Core = require('./hakurei').Core;
var Util = require('./hakurei').Util;

var SceneWarnings = require('./scene/warnings');
var SceneLoading = require('./hakurei').Scene.Loading;
var SceneRule = require('./scene/rule');
var SceneDuel = require('./scene/duel');
var SceneClear = require('./scene/clear');
var SceneExClear = require('./scene/ex_clear');

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
	//this.scene_manager.changeScene("loading", Assets, "duel");
};

module.exports = Game;
