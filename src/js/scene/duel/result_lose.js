'use strict';

var BaseScene = require('./result_base');
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
	this._judge_message.show("LOSE...", CONSTANT.COLOR_BLUE);

	// 負けSE
	this.core.audio_loader.playSound("lose");
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

		// 魔理沙は銃をつきつけられる
		this.parent.marisa().gunPointed();

		// 銃表示
		this._showGun();
		return;
	}
	// N秒間は銃を見せ続ける
	else if(this.frame_count < 180) {
		return;
	}
	else if (this.frame_count === 180) {
		// ロシアンルーレット
		if (this.parent.rule_manager.roulette()) {
			// lose シーンはここで終わり
			this.parent.changeSubScene("dead");
		}
		else {
			// 魔理沙は生き残った(恐怖レベル+1)
			this.parent.marisa().survive();

			this._hideGun();
		}
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

SceneDuelLose.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	if (this._gun_transparent === 0.0) {
		return;
	}

	// 銃を表示
	var ctx = this.core.ctx;
	var revolver = this.core.image_loader.getImage("revolver");
	ctx.save();
	ctx.globalAlpha = this._gun_transparent;
	ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);
	ctx.drawImage(revolver, -revolver.width/2, -revolver.height/2);
	ctx.restore();
};

SceneDuelLose.prototype._showGun = function(){
	// 銃を突きつける SE
	this.core.audio_loader.playSound("revolver_prepare");

	this._gun_transparent = 1.0;
};

SceneDuelLose.prototype._hideGun = function() {
	// 銃が空打ちの SE
	this.core.audio_loader.playSound("revolver_not_fire");

	this._is_start_gun_extinguish = true;
};

module.exports = SceneDuelLose;
