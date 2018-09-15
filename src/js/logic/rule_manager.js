'use strict';

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;

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
