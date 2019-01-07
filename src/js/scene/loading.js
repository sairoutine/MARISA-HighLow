'use strict';

var BaseScene = require('../hakurei').Scene.Loading;
var CONSTANT = require('../constant');

var AssetsAll = require('../assets_all');
var Util = require('../hakurei').Util;

var TRANSIT_COUNT = 300;


var SceneLoading = function(core) {
	BaseScene.apply(this, arguments);

};
Util.inherit(SceneLoading, BaseScene);

SceneLoading.prototype.init = function(){
	BaseScene.prototype.init.apply(this, [AssetsAll]);
};

SceneLoading.prototype._loadSounds = function(sounds) {
	var ext = Util.canPlayOgg() ? ".ogg" : ".m4a";

	for (var key2 in sounds) {
		var conf2 = sounds[key2];

		// デバッグ用ミュート
		var volume2 = CONSTANT.DEBUG_MUTE ? 0 : conf2.volume;

		this.core.audio_loader.loadSound(key2, conf2.path + ext, volume2);
	}
};

SceneLoading.prototype.beforeDraw = function(){
	this.frame_count++;

	// 1. ローディングが済んでいること
	// 2. トランジションが終わった or ユーザーがクリックした
	if (this.core.isAllLoaded() && (this.frame_count > TRANSIT_COUNT || this.core.input_manager.isLeftClickPush())) {
		if (CONSTANT.DEBUG) {
			// デバッグ用画面遷移
			this.core.scene_manager.changeScene(CONSTANT.DEBUG_SCENE);
		}
		else {
			// 本番用画面遷移
			this.core.scene_manager.changeScene("rule");
		}
	}
};

SceneLoading.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 背景
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_BLACK;
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	this._drawCaution();

	if (!this.core.isAllLoaded()) {
		this._drawLoading();
	}
};

SceneLoading.prototype._drawCaution = function(){
	var ctx = this.core.ctx;

	ctx.save();

	// トランジション
	var alpha = 0.0;
	if (this.frame_count < TRANSIT_COUNT * 1/3) {
		alpha = this.frame_count * 3 / TRANSIT_COUNT;
	}
	else if (TRANSIT_COUNT * 1/3 <= this.frame_count && this.frame_count < TRANSIT_COUNT * 2/3) {
		alpha = 1.0;
	}
	else if (TRANSIT_COUNT * 2/3 <= this.frame_count && this.frame_count < TRANSIT_COUNT * 3/3) {
		alpha = (TRANSIT_COUNT - this.frame_count) * 3 / TRANSIT_COUNT;
	}
	ctx.globalAlpha = alpha;

	// caution
	var caution = this.core.image_loader.getImage("caution");
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(caution,
		-caution.width/2,
		-caution.height/2);
	ctx.restore();
};

SceneLoading.prototype._drawLoading = function(){
	var ctx = this.core.ctx;

	var per_frame = this.frame_count % 60;
	var DOT_SPAN = 15;

	var dot = "";
	if (DOT_SPAN > per_frame && per_frame >= 0) {
		dot = "";
	}
	else if (DOT_SPAN*2 > per_frame && per_frame >= DOT_SPAN*1) {
		dot = ".";
	}
	else if (DOT_SPAN*3 > per_frame && per_frame >= DOT_SPAN*2) {
		dot = "..";
	}
	else {
		dot = "...";
	}

	// Loading メッセージ
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_WHITE;
	ctx.textAlign = 'left';
	ctx.font = "30px 'MyFont'";
	ctx.fillText('Now Loading' + dot, this.core.width - 250, this.core.height - 50);
	ctx.restore();

	// プログレスバー
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_WHITE;
	ctx.fillRect(0, this.core.height - 20, this.core.width * this.progress(), 50);
	ctx.restore();
};


module.exports = SceneLoading;
