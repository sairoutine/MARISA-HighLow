'use strict';

// 魔理沙

var BaseObject = require('../hakurei').Object.Base;
var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var BODY_IMAGE_BY_DREAD_IDX = [
	"body_1",
	"body_2",
	"body_3",
	"body_4",
	"body_5",
];

var HEAD_IMAGE_BY_DREAD_IDX = [
	"head_1",
	"head_2",
	"head_3",
	"head_4",
	"head_4",
];

var MOUSE_IMAGE_BY_DREAD_IDX = [
	[
		"mouse_1_1",
		"mouse_1_2",
		"mouse_1_3",
		"mouse_1_4",
	],
	[
		"mouse_2_1",
		"mouse_2_2",
		"mouse_2_3",
		"mouse_2_4",
	],
	[
		"mouse_3_1",
		"mouse_3_2",
		"mouse_3_3",
		"mouse_3_4",
	],
	[
		"mouse_4_1",
		"mouse_4_2",
		"mouse_4_3",
		"mouse_4_4",
	],
	[
		"mouse_4_1",
		"mouse_4_2",
		"mouse_4_3",
		"mouse_4_4",
	],
];

var EYE_IMAGE_BY_DREAD_IDX = [
	[
		"eye_1_1",
		"eye_1_2",
		"eye_1_3",
		"eye_1_4",
	],
	[
		"eye_1_1",
		"eye_1_2",
		"eye_1_3",
		"eye_1_4",
	],
	[
		"eye_2_1",
		"eye_2_2",
		"eye_2_3",
		"eye_2_4",
	],
	[
		"eye_3_1",
		"eye_3_2",
		"eye_3_3",
		"eye_3_4",
	],
	[
		"eye_4_1",
		"eye_4_2",
		"eye_4_3",
		"eye_4_4",
	],
	[
		"eye_4_1",
		"eye_4_2",
		"eye_4_3",
		"eye_4_4",
	],
];



var Marisa = function(scene) {
	BaseObject.apply(this, arguments);

	// 死亡したかどうか
	this._is_dead = false;

	// 恐怖レベル
	this._dread_idx = 0;

	// 表情
	this._face_idx = 0;

	// 表情画像名
	this._body_image  = null;
	this._head_image  = null;
	this._mouse_image = null;
	this._eye_image   = null;
};
Util.inherit(Marisa, BaseObject);

Marisa.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	// 死亡したかどうか
	this._is_dead = false;

	// 恐怖レベル
	this._dread_idx = 0;

	// 表情
	this._face_idx = 0;

	// 表情画像名
	this._body_image  = null;
	this._head_image  = null;
	this._mouse_image = null;
	this._eye_image   = null;

	// 初期 表情決定
	this._setFace(this._dread_idx, this._face_idx);
};

Marisa.prototype.beforeDraw = function(){
	BaseObject.prototype.beforeDraw.apply(this, arguments);

};

Marisa.prototype.draw = function(){
	BaseObject.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	var body, head, mouse, eye;
	if(this._is_dead) {
		// 死んでいる
		body = this.core.image_loader.getImage(this._body_image);
		head = this.core.image_loader.getImage("head_dead");

		ctx.save();
		ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);

		ctx.drawImage(body, -body.width/2, -body.height/2);
		ctx.drawImage(head, -head.width/2, -head.height/2);
		ctx.restore();
	}
	else {
		// 生きている
		body = this.core.image_loader.getImage(this._body_image);
		head = this.core.image_loader.getImage(this._head_image);
		mouse = this.core.image_loader.getImage(this._mouse_image);
		eye = this.core.image_loader.getImage(this._eye_image);

		ctx.save();
		ctx.translate(CONSTANT.MARISA_CENTER_X, CONSTANT.MARISA_CENTER_Y);

		ctx.drawImage(body, -body.width/2, -body.height/2);
		ctx.drawImage(head, -head.width/2, -head.height/2);
		ctx.drawImage(mouse, -mouse.width/2, -mouse.height/2);
		ctx.drawImage(eye, -eye.width/2, -eye.height/2);

		ctx.restore();
	}
};

// 死亡する
Marisa.prototype.die = function() {
	this._is_dead = true;
};

// 銃をつけつけられて生き残った
Marisa.prototype.survive = function() {
	this._dread_idx++;
};

// 表情をランダムに決定
Marisa.prototype.rouletteFace = function() {
	var face_idx = Util.getRandomInt(4) - 1;

	// 前回の表情と同じ表情にならないようランダムな表情に変更
	while (this._face_idx === face_idx) {
		face_idx = Util.getRandomInt(4) - 1;
	}
	this._face_idx = face_idx;

	this._setFace(this._dread_idx, this._face_idx);
};

// 表情を設定
Marisa.prototype._setFace = function(dread_idx, face_idx) {
	// 表情画像名 変更
	this._body_image = BODY_IMAGE_BY_DREAD_IDX[ dread_idx ];
	this._head_image = HEAD_IMAGE_BY_DREAD_IDX[ dread_idx ];

	this._mouse_image = MOUSE_IMAGE_BY_DREAD_IDX[ dread_idx ][ face_idx ];
	this._eye_image = EYE_IMAGE_BY_DREAD_IDX[ dread_idx ][ face_idx ];
};

module.exports = Marisa;
