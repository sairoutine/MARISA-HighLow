'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;
var CONSTANT = require('../constant');

var BattleManager = function(scene) {
	BaseObject.apply(this, arguments);

	this._money = 0;
};
Util.inherit(BattleManager, BaseObject);

BattleManager.prototype.init = function(serif_idx){
	BaseObject.prototype.init.apply(this, arguments);

	this._money = 1;
};

BattleManager.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);
};

BattleManager.prototype.checkGameJudge = function(){
	if (this._money >= CONSTANT.CLEAR_NEED_MONEY) {
		// ゲームクリア
		this.core.scene_manager.changeScene("win");

		return true;
	}
	else if (this.scene.deck().count() === 0 && this._money < CONSTANT.CLEAR_NEED_MONEY) {
		// ゲームオーバー
		this.scene.changeSubScene("not_reach");

		return true;
	}

	return false;
};

BattleManager.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

BattleManager.prototype.pass = function(){
	this.scene.changeSubScene("pass");
};

BattleManager.prototype.chooseHigh = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num > opened_num) {
		this._money *= 2;
		this.scene.changeSubScene("win");
	}
	else if (top_num === opened_num) {
		this.scene.changeSubScene("draw");
	}
	else if (top_num < opened_num) {
		this.scene.changeSubScene("lose");
	}
};

BattleManager.prototype.chooseLow = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num > opened_num) {
		this.scene.changeSubScene("lose");
	}
	else if (top_num === opened_num) {
		this.scene.changeSubScene("draw");
	}
	else if (top_num < opened_num) {
		this._money *= 2;
		this.scene.changeSubScene("win");
	}
};

BattleManager.prototype.chooseSame = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num === opened_num) {
		this._money *= 10;
		this.scene.changeSubScene("win");
	}
	else {
		this.scene.changeSubScene("lose");
	}
};

BattleManager.prototype.money = function(){
	return this._money;
};




module.exports = BattleManager;
