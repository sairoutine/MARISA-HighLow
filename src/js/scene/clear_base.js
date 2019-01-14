'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var CONSTANT = require('../constant');

var Util = require('../hakurei').Util;

var SceneClearMain = require('./clear/main');
var SceneClearAtsumaruShareDialog = require('./clear/atsumaru_share_dialog');

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	// サブシーン
	this.addSubScene("main", new SceneClearMain(core));
	this.addSubScene("atumaru_share_dialog", new SceneClearAtsumaruShareDialog(core));

	// 稼いだお金
	this._moneyStr = "";
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(money){
	BaseScene.prototype.init.apply(this, arguments);

	money = money || 0;

	// 稼いだお金
	this._moneyStr = this._comma(money);

	this.core.scene_manager.setFadeIn(60, CONSTANT.COLOR_BLACK);

	// SE再生
	this.core.audio_loader.playSound(this.soundName());

	// サブシーン遷移
	this.changeSubScene("main");
};

// 数値を受け取りカンマの入った文字列を返す
Scene.prototype._comma = function(num) {
	var numStr = num.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');

	return numStr;
};

Scene.prototype.beforeDraw = function() {
	BaseScene.prototype.beforeDraw.apply(this, arguments);

};

Scene.prototype.draw = function(){
	var ctx = this.core.ctx;
	// 背景
	var bg = this.core.image_loader.getImage(this.bgName());
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg, -bg.width/2, -bg.height/2);
	ctx.restore();

	ctx.save();
	ctx.font = "48px 'MyFont'";

	// 文字を縁取る
	ctx.strokeStyle = CONSTANT.COLOR_BLACK;
	ctx.lineWidth = 4.0;
	ctx.textAlign = 'left';
	ctx.strokeText("Congratulations!!", 20, 50);
	ctx.textAlign = 'right';
	ctx.strokeText("獲得した金額" + this._moneyStr + "円", this.width, this.height - 20);

	// 文字本体
	ctx.fillStyle = "rgb(255,215,0)";
	ctx.textAlign = 'left';
	ctx.fillText("Congratulations!!", 20, 50);
	ctx.textAlign = 'right';
	ctx.fillText("獲得した金額" + this._moneyStr + "円", this.width, this.height - 20);
	ctx.restore();

	// サブシーン
	BaseScene.prototype.draw.apply(this, arguments);
};

// クリア画面を終えて、次のシーンへ
Scene.prototype.exit = function(){
	this.core.scene_manager.setFadeOut(60, CONSTANT.COLOR_BLACK);
	this.core.scene_manager.changeScene("rule");
};

Scene.prototype.soundName = function(){
	throw new Error("soundName must be overridden.");
};

Scene.prototype.bgName = function(){
	throw new Error("bgName must be overridden.");
};

module.exports = Scene;
