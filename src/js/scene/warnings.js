'use strict';

var BaseScene = require('../hakurei').Scene.Base;
var Util = require('../hakurei').Util;

var TRANSIT_COUNT = 300;

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(field_name, is_right){
	BaseScene.prototype.init.apply(this, arguments);
};

Scene.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.frame_count > TRANSIT_COUNT) {
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

module.exports = Scene;
