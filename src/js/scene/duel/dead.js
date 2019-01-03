'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var CONSTANT = require('../../constant');

var FLASH_COUNT = 3;

var SceneDuelDead = function(core) {
	BaseScene.apply(this, arguments);

	this._flash_transparent = 0.0;
	this._message_transparent = 0.0;
};
Util.inherit(SceneDuelDead, BaseScene);

SceneDuelDead.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._flash_transparent = 0.0;
	this._message_transparent = 0.0;
};


SceneDuelDead.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.frame_count <= FLASH_COUNT) {
		this._flash_transparent = this.frame_count / FLASH_COUNT;
	}
	else if (this.frame_count <= FLASH_COUNT*2) {
		this._flash_transparent = (FLASH_COUNT*2 - this.frame_count) / FLASH_COUNT;
	}
	else if (this.frame_count <= 30) {
		// フラッシュから少し待機
	}
	else if (this.frame_count <= 60) {
		this._message_transparent += (1 / (60 - 30));
	}
	else {
		if(this.core.input_manager.isLeftClickPush()) {
			// ゲームを最初から
			this.core.scene_manager.changeScene("duel");
		}
	}
};

SceneDuelDead.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 死亡後も銃を表示しつづける
	var revolver = this.core.image_loader.getImage("revolver");
	ctx.save();
	ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);
	ctx.drawImage(revolver, -revolver.width/2, -revolver.height/2);
	ctx.restore();

	// フラッシュ
	if (this._flash_transparent > 0.0) {
		ctx.save();
		ctx.fillStyle = "white";
		ctx.globalAlpha = this._flash_transparent;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
	}
	// メッセージウィンドウ
	else if (this._message_transparent > 0.0) {
		ctx.save();
		ctx.globalAlpha = this._message_transparent;
		ctx.translate(this.width/2, this.height/2);

		// ウィンドウ
		var image = this.core.image_loader.getImage("message_window");
		ctx.drawImage(image,
			-400/2,
			-200/2,
			400,
			200
		);

		// 文字
		ctx.fillStyle = "red";
		ctx.font = "36px 'MyFont'";
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText("射殺された...", 0, 0);

		ctx.restore();
	}
};

module.exports = SceneDuelDead;
