'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var SceneDuelPass = function(core) {
	BaseScene.apply(this, arguments);
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
	else if (this.frame_count === 60) {
		this.parent.startSerifExtinguish();
		return;
	}
	else {
		// 左のカードを右へ移動する演出
		var x = this.parent.deck().topCard().x() + 10;
		this.parent.deck().topCard().x(x);

		if (x >= CONSTANT.OPEN_CARD_X) {
			// 移動が終わったら次へ
			this.parent.setNewCard();
			this.parent.changeSubScene("choose");
		}
	}
};

SceneDuelPass.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneDuelPass;
