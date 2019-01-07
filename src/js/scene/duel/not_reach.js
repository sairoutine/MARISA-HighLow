'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');


var SceneDuelNotReach = function(core) {
	BaseScene.apply(this, arguments);
	this._message_transparent = 0.0;
	this._gun_transparent = 0.0;
};
Util.inherit(SceneDuelNotReach, BaseScene);

SceneDuelNotReach.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	this._message_transparent = 0.0;
	this._gun_transparent = 0.0;
};


SceneDuelNotReach.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.frame_count < 30) {
		this._message_transparent += 1 / 30;
	}
	else if (this.frame_count === 30) {
		// メッセージを表示している最中から心音が速くなる
		this.parent.marisa().gunPointed();
	}
	else if (this.frame_count < 90) {
		// N秒間はメッセージを見せ続ける
	}
	else if (this.frame_count === 90) {
		// 銃表示
		this._gun_transparent = 1.0;

		// SE
		this.core.audio_loader.playSound("revolver_prepare");
	}
	else if (this.frame_count < 210) {
		// N秒間は銃を見せ続ける
	}
	else {
		this.parent.changeSubScene("dead");
	}
};

SceneDuelNotReach.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;
	// メッセージウィンドウ
	if (this._message_transparent > 0.0) {
		ctx.save();
		ctx.globalAlpha = this._message_transparent;
		ctx.translate(this.width/2, this.height/2);

		// ウィンドウ
		var image = this.core.image_loader.getImage("message_window");
		ctx.drawImage(image,
			-600/2,
			-200/2,
			600,
			200
		);

		// 文字
		ctx.fillStyle = CONSTANT.COLOR_VIVID_RED;
		ctx.font = "36px 'MyFont'";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText("獲得金額が1億円に満たない！", 0, 0);

		ctx.restore();
	}

	if (this._gun_transparent > 0.0) {
		// 銃を表示
		var revolver = this.core.image_loader.getImage("revolver");
		ctx.save();
		ctx.globalAlpha = this._gun_transparent;
		ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);
		ctx.drawImage(revolver, -revolver.width/2, -revolver.height/2);
		ctx.restore();
	}

};

module.exports = SceneDuelNotReach;
