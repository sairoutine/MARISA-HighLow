'use strict';

// 魔理沙

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var Marisa = function(scene) {
	BaseObject.apply(this, arguments);

	// 死亡したかどうか
	this._is_dead = false;
};
Util.inherit(Marisa, BaseObject);

Marisa.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 死亡したかどうか
	this._is_dead = false;
};

Marisa.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);

};

Marisa.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	if(this._is_dead) {
		// 死んでいる
		var body = this.core.image_loader.getImage("body_dead");
		var head = this.core.image_loader.getImage("head_dead");

		ctx.save();
		ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);

		ctx.drawImage(body, -body.width/2, -body.height/2);
		ctx.drawImage(head, -head.width/2, -head.height/2);
		ctx.restore();
	}
	else {
		// 生きている
		var foot = this.core.image_loader.getImage("body_1");
		var face = this.core.image_loader.getImage("head_1");
		var mouse = this.core.image_loader.getImage("mouse_1_1");
		var eye = this.core.image_loader.getImage("eye_1_1");
		ctx.save();
		ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);

		ctx.drawImage(foot, -foot.width/2, -foot.height/2);
		ctx.drawImage(face, -face.width/2, -face.height/2);
		ctx.drawImage(mouse, -mouse.width/2, -mouse.height/2);
		ctx.drawImage(eye, -eye.width/2, -eye.height/2);

		ctx.restore();
	}
};

// 死亡する
Marisa.prototype.die = function(){
	this._is_dead = true;
};

module.exports = Marisa;
