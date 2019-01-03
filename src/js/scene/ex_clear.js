'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(field_name, is_right){
	BaseScene.prototype.init.apply(this, arguments);

	this.core.scene_manager.setFadeIn(60, "black");
};

Scene.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		this.core.scene_manager.setFadeOut(60, "black");
		this.core.scene_manager.changeScene("rule");
	}
};

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;
	// 背景
	var bg = this.core.image_loader.getImage("ex_clear");
	ctx.save();
	ctx.translate(this.width/2, this.height/2);
	ctx.drawImage(bg, -bg.width/2, -bg.height/2);
	ctx.restore();

	ctx.save();
	ctx.font = "48px 'MyFont'";

	// 文字を縁取る
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 4.0;
	ctx.strokeText("Congratulations!!", this.width/2, this.height - 50);

	// 文字本体
	ctx.fillStyle = "rgb(255,215,0)";
	ctx.fillText("Congratulations!!", this.width/2, this.height - 50);
	ctx.restore();
};

module.exports = Scene;
