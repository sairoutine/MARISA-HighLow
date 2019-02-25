'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;
var CONSTANT = require('../constant');

var RuleManager = function(scene) {
	BaseObject.apply(this, arguments);

	this._bullet_num = 0;
	this._money = 0;

	this._is_win = false;
	this._is_lose = false;
};
Util.inherit(RuleManager, BaseObject);

RuleManager.prototype.init = function(serif_idx){
	BaseObject.prototype.init.apply(this, arguments);

	this._bullet_num = 5;
	this._money = 1;

	this._is_win = false;
	this._is_lose = false;
};

RuleManager.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);
};

RuleManager.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	/*
	// デバッグ中ならば残弾数を表示する
	if (CONSTANT.DEBUG) {
		var ctx = this.core.ctx;
		ctx.save();
		ctx.fillStyle = CONSTANT.COLOR_VIVID_RED;
		ctx.textAlign = 'left';
		ctx.font = "16px 'sans-serif'";
		ctx.fillText("残弾数: " + this._bullet_num, this.scene.width - 70, this.scene.height - 40);
		ctx.restore();
	}
	*/
};

RuleManager.prototype.twiceMoney = function(){
	this._money *= 2;
};

RuleManager.prototype.isGameOver = function(){
	return this.scene.deck().count() === 0 && this._money < CONSTANT.CLEAR_NEED_MONEY;
};

RuleManager.prototype.isClear = function(){
	return this.scene.deck().count() === 0 && CONSTANT.EX_CLEAR_NEED_MONEY > this._money && this._money >= CONSTANT.CLEAR_NEED_MONEY;
};

RuleManager.prototype.isExClear = function(){
	return this.scene.deck().count() === 0 && this._money >= CONSTANT.EX_CLEAR_NEED_MONEY;
};

RuleManager.prototype.isOnlyLose = function(){
	return (!this._is_win && this._is_lose);
};

RuleManager.prototype.pass = function(){
	this.scene.changeSubScene("pass");
};

RuleManager.prototype.chooseHigh = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num > opened_num) {
		this._setWin();

		this.twiceMoney();

		this.scene.changeSubScene("win");
	}
	else if (top_num === opened_num) {
		this.scene.changeSubScene("draw");
	}
	else if (top_num < opened_num) {
		this._setLose();

		this.scene.changeSubScene("lose");
	}
};

RuleManager.prototype.chooseLow = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num > opened_num) {
		this._setLose();

		this.scene.changeSubScene("lose");
	}
	else if (top_num === opened_num) {
		this.scene.changeSubScene("draw");
	}
	else if (top_num < opened_num) {
		this._setWin();

		this.twiceMoney();

		this.scene.changeSubScene("win");
	}
};

RuleManager.prototype.chooseSame = function(){
	var top_num = this.scene.deck().topCard().number();
	var opened_num = this.scene.opendCard().number();
	if (top_num === opened_num) {
		this._setWin();

		this._money *= 10;

		this.scene.changeSubScene("win");
	}
	else {
		this._setLose();

		this.scene.changeSubScene("lose");
	}
};

RuleManager.prototype.roulette = function(){
	var fired_bullet = Util.getRandomInt(this._bullet_num);
	this._bullet_num--;

	return(fired_bullet === 1 ? true : false);
};

RuleManager.prototype.money = function(){
	return this._money;
};

RuleManager.prototype._setWin = function(){
	if (!this._is_win) {
		this._is_win = true;
	}
};

RuleManager.prototype._setLose = function(){
	if (!this._is_lose) {
		this._is_lose = true;
	}
};




module.exports = RuleManager;
