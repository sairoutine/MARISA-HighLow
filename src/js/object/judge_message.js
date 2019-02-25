'use strict';

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var JudgeMessage = function(scene) {
	BaseObject.apply(this, arguments);

	this._text = "";
	this._color = null;
	this._transparent = 0.0;
	this._is_start_extinguish = false;
	this._is_start_show = false;
};
Util.inherit(JudgeMessage, BaseObject);

JudgeMessage.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._text = "";
	this._color = CONSTANT.COLOR_WHITE;
	this._transparent = 0.0;
	this._is_start_extinguish = false;
	this._is_start_show = false;
};

JudgeMessage.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	if (this._is_start_extinguish && this._transparent !== 0.0) {
		this._transparent -= 0.1;

		if (this._transparent <= 0.0) {
			this._is_start_extinguish = false;
			this._transparent = 0.0;
		}
	}
	else if (this._is_start_show && this._transparent !== 1.0) {
		this._transparent += 0.1;

		if (this._transparent >= 1.0) {
			this._is_start_show = false;
			this._transparent = 1.0;
		}
	}

};

JudgeMessage.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	if (this._transparent === 0.0) {
		return;
	}

	var ctx = this.core.ctx;
	ctx.save();
	ctx.globalAlpha = this._transparent;
	ctx.fillStyle = this._color;
	ctx.font = "64px 'MyFont'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'top';
	ctx.fillText(this._text, 170, 500);
	ctx.restore();

};

JudgeMessage.prototype.show = function(text, color){
	this._transparent = 0.0;
	this._is_start_show = true;
	this._is_start_extinguish = false;
	this._text = text;
	this._color = color;
};

JudgeMessage.prototype.extinguish = function(){
	this._is_start_show = false;
	this._is_start_extinguish = true;
};



module.exports = JudgeMessage;
