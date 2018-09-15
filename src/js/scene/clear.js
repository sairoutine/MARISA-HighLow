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
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "48px 'MyFont'";
	ctx.textAlign = 'center';
	//ctx.textBaseline = 'top';

	ctx.fillText("Congratulations!!", this.width/2, this.height/2);

	ctx.restore();
};

module.exports = Scene;
