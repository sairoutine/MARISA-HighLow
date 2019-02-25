'use strict';

// 魔理沙のHigh or Low or Same or Pass のセリフ

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var MESSAGE_OFFSET_X = -60;

// ウィンドウの大きさ
var WINDOW_SCALE = {
	WIDTH: 1,
	HEIGHT: 1,
};


var Serif = function(scene) {
	BaseObject.apply(this, arguments);

	this._text = "";
	this._transparent = 0.0;
	this._is_start_extinguish = false;
};
Util.inherit(Serif, BaseObject);

Serif.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._text = "";
	this._transparent = 0.0;
	this._is_start_extinguish = false;
};

Serif.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	if (this._is_start_extinguish && this._transparent !== 0.0) {
		this._transparent -= 0.1;

		if (this._transparent <= 0.0) {
			this._is_start_extinguish = false;
			this._transparent = 0.0;
		}
	}
};

Serif.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);

	if (this._transparent === 0.0) {
		return;
	}

	this._drawWindow(610, 280);
	this._drawText(610, 280, this._text);
};

Serif.prototype._drawWindow = function (x, y) {
	var ctx = this.core.ctx;
	ctx.save();
	ctx.translate(x, y);

	var fukidashi = this.core.image_loader.getImage("balloon_down_left");

	ctx.globalAlpha = this._transparent;

	// x,y座標は左上が基準位置
	ctx.drawImage(fukidashi,
		0 + MESSAGE_OFFSET_X,
		0,
		fukidashi.width * WINDOW_SCALE.WIDTH,
		fukidashi.height * WINDOW_SCALE.HEIGHT
	);
	ctx.restore();

};



Serif.prototype._drawText = function(x, y, text){
	y -= -40;
	x += MESSAGE_OFFSET_X + 50;

	var font_size = 36;

	var sentences = text.split("\n");
	var ctx = this.core.ctx;
	// 文言
	ctx.save();
	ctx.globalAlpha = this._transparent;
	ctx.fillStyle = CONSTANT.COLOR_BLACK;
	ctx.font = font_size.toString() + "px 'MyFont'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'top';

	for(var i = 0, len = sentences.length; i < len; i++) {
		y += font_size * 1.5;
		ctx.fillText(sentences[i], x, y); // 1行表示

	}

	ctx.restore();
};

Serif.prototype.show = function(text){
	this._transparent = 1.0;
	this._text = text;
};

Serif.prototype.startExtinguish = function(){
	this._is_start_extinguish = true;
};



module.exports = Serif;
