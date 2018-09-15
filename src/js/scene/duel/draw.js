'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var JudgeMessage = require('../../object/judge_message');
var CONSTANT = require('../../constant');

var SceneDuelDraw = function(core) {
	BaseScene.apply(this, arguments);
	this._judge_message = new JudgeMessage(this);
	this.addObjects([this._judge_message]);
};
Util.inherit(SceneDuelDraw, BaseScene);

SceneDuelDraw.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// トップを表に
	this.parent.deck().topCard().flip();

	// 勝敗メッセージ
	this._judge_message.show("DRAW", "green");
};


SceneDuelDraw.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	// N秒間は表にしたカードをその場所で見せ続ける
	if(this.frame_count < 60) {
		return;
	}
	else if (this.frame_count === 60) {
		this.parent.startSerifExtinguish();
		this._judge_message.extinguish();
		return;
	}
	else {
		// 左のカードを右へ移動する演出
		var x = this.parent.deck().topCard().x() + 10;
		this.parent.deck().topCard().x(x);

		if (x >= CONSTANT.OPEN_CARD_X) {
			// 移動が終わったら次へ
			this.parent.setNewCard();

			if (!this.parent.rule_manager.checkGameJudge()) {
				this.parent.changeSubScene("choose");
			}
		}
	}

};

SceneDuelDraw.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneDuelDraw;
