'use strict';

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var Marisa = function(scene) {
	BaseObject.apply(this, arguments);
};
Util.inherit(Marisa, BaseObject);

Marisa.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);
};

Marisa.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);

};

Marisa.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 背景
	var eye = this.core.image_loader.getImage("eye_1_1");
	var face = this.core.image_loader.getImage("head_1");
	var foot = this.core.image_loader.getImage("body_1");
	var mouse = this.core.image_loader.getImage("mouse_1_1");
	var revolver = this.core.image_loader.getImage("revolver");
	ctx.save();
	ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);

	ctx.drawImage(foot, -foot.width/2, -foot.height/2);
	ctx.drawImage(face, -face.width/2, -face.height/2);
	ctx.drawImage(mouse, -mouse.width/2, -mouse.height/2);
	ctx.drawImage(eye, -eye.width/2, -eye.height/2);
	ctx.drawImage(revolver, -revolver.width/2, -revolver.height/2);

	ctx.restore();
};

module.exports = Marisa;
