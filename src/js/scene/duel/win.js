'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var JudgeMessage = require('../../object/judge_message');
var CONSTANT = require('../../constant');

var SceneDuelWin = function(core) {
	BaseScene.apply(this, arguments);
	this._judge_message = new JudgeMessage(this);
	this.addObjects([this._judge_message]);
};
Util.inherit(SceneDuelWin, BaseScene);

SceneDuelWin.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// トップを表に
	this.parent.deck().topCard().flip();

	// 勝敗メッセージ
	this._judge_message.show("WIN !", CONSTANT.COLOR_RED);

	// 勝ちSE
	this.core.audio_loader.playSound("win");
};


SceneDuelWin.prototype.beforeDraw = function(){
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
		// フェードアウト中は何もしない
		if (this.core.scene_manager.isInFadeOut()) {
			return;
		}

		var x = this.parent.deck().topCard().x();

		// 左のカードを右へ移動する演出
		if (x < CONSTANT.OPEN_CARD_X) {
			x += 10;
			this.parent.deck().topCard().x(x);
		}
		// 移動が終わったら
		else {
			this.parent.setNewCard();

			if (this.parent.rule_manager.isClear()) {
				// クリア
				this.core.scene_manager.setFadeOut(60, CONSTANT.COLOR_BLACK);
				this.core.scene_manager.changeScene("clear");
			}
			else if (this.parent.rule_manager.isExClear()) {
				// EXクリア
				this.core.scene_manager.setFadeOut(60, CONSTANT.COLOR_BLACK);
				this.core.scene_manager.changeScene("ex_clear");
			}
			else if (this.parent.rule_manager.isGameOver()) {
				// ゲームオーバー
				this.parent.changeSubScene("not_reach");
			}
			else {
				// 魔理沙の表情を変更
				this.parent.marisa().rouletteFace();

				// 次へ
				this.parent.changeSubScene("choose");
			}
		}
	}

};

SceneDuelWin.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneDuelWin;
