'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');
var Serif = require('../../object/serif');
var JudgeMessage = require('../../object/judge_message');



var SceneDuelPass = function(core) {
	BaseScene.apply(this, arguments);
	this._serif = new Serif(this);
	this._judge_message = new JudgeMessage(this);
	this.addObjects([this._serif, this._judge_message]);
};
Util.inherit(SceneDuelPass, BaseScene);

SceneDuelPass.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// トップを表に
	this.parent.deck().topCard().flip();
};


SceneDuelPass.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	// N秒間は表にしたカードをその場所で見せ続ける
	if(this.frame_count < 60) {
		return;
	}
	// 左のカードを右へ移動する演出
	var x = this.parent.deck().topCard().x() + 10;
	this.parent.deck().topCard().x(x);

	if (x >= CONSTANT.OPEN_CARD_X) {
		// 移動が終わったら次へ
		this.parent.setNewCard();
		this.parent.changeSubScene("choose");
	}
};

SceneDuelPass.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneDuelPass;
