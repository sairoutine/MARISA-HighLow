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
		this.core.scene_manager.changeScene("duel");
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

	var text0 = "・ルール説明\n今、表になっているカードより、次にめくるカードの数字が大きいか小さいかを当てる。\n予想が的中すると所持金が2倍になるが、外すとロシアンルーレットとなる。\n\nHigh: 高い数字が出た場合に勝利。所持金が2倍になる。\nLow: 低い数字が出た場合に勝利。所持金が2倍になる。\nSame: 同じ数字が出た場合に勝利。所持金が10倍になる。\nPass: めくったカードをスルーする。\n";
	var text2 = "・クリア条件\n所持金1円を1億円に増やすこと";
	var text3 = "なお、山札(35枚)が無くなった時点で\n所持金が1億円に満たなければ即射殺となる。";

	this._drawText(30, 10, 18, "white", text0);
	this._drawText(30, 300, 18, "white", text2);
	this._drawText(30, 400, 18, "white", text3);
};
Scene.prototype._drawText = function(x, y, size, color, text){
	var sentences = text.split("\n");
	var ctx = this.core.ctx;
	// 文言
	ctx.save();
	ctx.fillStyle = color;
	ctx.font = size.toString() + "px 'MyFont'";
	ctx.textAlign = 'left';
	ctx.textBaseAlign = 'top';

	for(var i = 0, len = sentences.length; i < len; i++) {
		y += size * 1.5;
		ctx.fillText(sentences[i], x, y); // 1行表示

	}

	ctx.restore();
};

module.exports = Scene;
