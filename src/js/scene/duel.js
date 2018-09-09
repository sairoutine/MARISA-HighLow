'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;
var SceneDuelChoose   = require('./duel/choose');
var SceneDuelDead     = require('./duel/dead');
var SceneDuelDraw     = require('./duel/draw');
var SceneDuelLose     = require('./duel/lose');
var SceneDuelNotReach = require('./duel/not_reach');
var SceneDuelWin      = require('./duel/win');

var Deck = require('../object/deck');

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	this._deck = new Deck(this);
	this._current_yen = 0;

	this._opened_card = null;
	this._candidate_card = null;

	// サブシーン
	this.addSubScene("choose", new SceneDuelChoose(core));
	this.addSubScene("dead", new SceneDuelDead(core));
	this.addSubScene("draw", new SceneDuelDraw(core));
	this.addSubScene("lose", new SceneDuelLose(core));
	this.addSubScene("not_reach", new SceneDuelNotReach(core));
	this.addSubScene("win", new SceneDuelWin(core));
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(field_name, is_right){
	BaseScene.prototype.init.apply(this, arguments);

	this._deck.init();
	this._current_yen = 1;

	this._opened_card = this._deck.serve();
	this._opened_card.flip(); // open
	// TODO:
	this._opened_card.setPosition(330, 330);
	this._candidate_card = this._deck.serve();
	this._candidate_card.setPosition(130, 330);

	this.changeSubScene("choose");
};

Scene.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	// 左クリック位置を出力
	if (true) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}


};

Scene.prototype.draw = function(){
	var ctx = this.core.ctx;
	// 背景
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);

	this._deck.draw();

	// 候補カードの描画
	this._candidate_card.draw();

	// 既に開かれたカードの描画
	this._opened_card.draw();

	// デッキ残り枚数の描画
	// TODO:
	var deck_num = this._deck.count();
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "36px 'Comic Sans MS'";
	ctx.textAlign = 'left';
	ctx.textBaseAlign = 'top';

	ctx.fillText("残りのカード：" + deck_num + "枚", 50, 550);

	// 所持金
	// TODO:
	ctx.fillText("所持金：" + this._current_yen + "円", 50, 600);
	ctx.restore();
};

module.exports = Scene;
