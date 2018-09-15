'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var JudgeMessage = require('../../object/judge_message');
var CONSTANT = require('../../constant');

var SceneDuelLose = function(core) {
	BaseScene.apply(this, arguments);
	this._judge_message = new JudgeMessage(this);
	this.addObjects([this._judge_message]);

	this._gun_transparent = 0.0;
	this._is_start_gun_extinguish = false;
};
Util.inherit(SceneDuelLose, BaseScene);

SceneDuelLose.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._gun_transparent = 0.0;
	this._is_start_gun_extinguish = false;

	// トップを表に
	this.parent.deck().topCard().flip();

	// 勝敗メッセージ
	this._judge_message.show("LOSE...", "blue");
};


SceneDuelLose.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this._is_start_gun_extinguish && this._gun_transparent !== 0.0) {
		this._gun_transparent -= 0.1;

		if (this._gun_transparent <= 0.0) {
			this._is_start_gun_extinguish = false;
			this._gun_transparent = 0.0;
		}
	}

	// N秒間は表にしたカードをその場所で見せ続ける
	if(this.frame_count < 60) {
		return;
	}
	else if (this.frame_count === 60) {
		this.parent.startSerifExtinguish();
		this._judge_message.extinguish();

		this._showGun();
		return;
	}
	// N秒間は銃を見せ続ける
	else if(this.frame_count < 120) {
		return;
	}
	else if (this.frame_count === 120) {
		// ロシアンルーレット
		if (this.parent.rule_manager.roulette()) {
			// lose シーンはここで終わり
			this.parent.changeSubScene("dead");
		}
		else {
			this._hideGun();
		}
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

SceneDuelLose.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	if (this._gun_transparent === 0.0) {
		return;
	}

	// TODO:
	var ctx = this.core.ctx;
	ctx.save();
	ctx.globalAlpha = this._gun_transparent;
	ctx.fillStyle = "red";
	ctx.font = "48px 'MyFont'";
	ctx.fillText("銃サンプル", 400, 100);
	ctx.restore();
};

SceneDuelLose.prototype._showGun = function(){
	this._gun_transparent = 1.0;
};

SceneDuelLose.prototype._hideGun = function(){
	this._is_start_gun_extinguish = true;
};

module.exports = SceneDuelLose;
