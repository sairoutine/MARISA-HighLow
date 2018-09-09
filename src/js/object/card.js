'use strict';

var BaseObject = require('../hakurei').Object.Sprite;
var Util = require('../hakurei').Util;

var Card = function(scene) {
	BaseObject.apply(this, arguments);

	// 色
	this._type   = null;
	// 数字
	this._number = null;
	// 表／裏
	this._is_reverse = true;
};
Util.inherit(Card, BaseObject);

Card.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// TODO:
	this._type   = null;
	this._number = null;
	this._is_reverse = true;
};
// 裏／表反転
Card.prototype.flip = function(){
	this._is_reverse = !this._is_reverse;
};

Card.prototype.setType = function(type, number){
	this._type   = type;
	this._number = number;
};
Card.prototype.type = function(){
	return this._type;
};
Card.prototype.number = function(){
	return this._number;
};
Card.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);
};

Card.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
};

Card.prototype.spriteName = function(){
	return "trump";
};
Card.prototype.spriteIndexX = function(){
	if (this._is_reverse) {
		return this._type + 4;
	}
	else {
		if (this._number >= 8) {
			return 4 + this._type;
		}
		else {
			return this._type;
		}
	}
};
Card.prototype.spriteIndexY = function(){
	if (this._is_reverse) {
		return 6;
	}
	else {
		if (this._number >= 8) {
			return this._number - 1 - 7;
		}
		else {
			return this._number - 1;
		}
	}
};
Card.prototype.scaleWidth = function(){
	return 2.25;
};
Card.prototype.scaleHeight = function(){
	return 2.25;
};


Card.prototype.spriteWidth = function(){
	return 60;
};
Card.prototype.spriteHeight = function(){
	return 90;
};

module.exports = Card;
