'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;
var CONSTANT = require('../constant');

var RuleManager = function(scene) {
	BaseObject.apply(this, arguments);

	this._bullet_num = 0;
	this._money = 0;
};
Util.inherit(RuleManager, BaseObject);

RuleManager.prototype.init = function(serif_idx){
	BaseObject.prototype.init.apply(this, arguments);

	this._bullet_num = 5;
	this._money = 1;
};

RuleManager.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);
};

RuleManager.prototype.isGameOver = function(){
	return(this.scene.deck().count() === 0 && this._money < CONSTANT.CLEAR_NEED_MONEY);
};

RuleManager.prototype.isClear = function(){
	return this._money >= CONSTANT.CLEAR_NEED_MONEY;
};

RuleManager.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

RuleManager.prototype.pass = function(){
	this.scene.changeSubScene("pass");
};

RuleManager.prototype.chooseHigh = function(){
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

RuleManager.prototype.chooseLow = function(){
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

RuleManager.prototype.chooseSame = function(){
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

RuleManager.prototype.roulette = function(){
	var fired_bullet = Util.getRandomInt(this._bullet_num);
	this._bullet_num--;

	return(fired_bullet === 1 ? true : false);
};



RuleManager.prototype.money = function(){
	return this._money;
};




module.exports = RuleManager;
