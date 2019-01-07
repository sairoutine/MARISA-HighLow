'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(field_name, is_right){
	BaseScene.prototype.init.apply(this, arguments);
	this.core.scene_manager.setFadeIn(60, CONSTANT.COLOR_BLACK);
};

Scene.prototype.beforeDraw = function(){
	BaseScene.prototype.beforeDraw.apply(this, arguments);

	if (this.core.input_manager.isLeftClickPush()) {
		// フェードアウトする
		this.core.scene_manager.setFadeOut(60, CONSTANT.COLOR_BLACK);

		// SE再生
		this.core.audio_loader.playSound("next");

		// 次のシーンへ
		this.core.scene_manager.changeScene("duel");
	}
};

Scene.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
	var ctx = this.core.ctx;

	// 背景
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_BLACK;
	ctx.fillRect(0, 0, this.width, this.height);
	ctx.restore();

	var text0 = "・ルール説明\n今、表になっているカードより、次にめくるカードの数字が大きいか小さいかを当てる。\n予想が的中すると所持金が2倍になるが、外すとロシアンルーレットとなる。\n数字が同じ場合は、何も起こらない。";
	var text1 = "High: 高い数字が出た場合に勝利。所持金が2倍になる。\nLow: 低い数字が出た場合に勝利。所持金が2倍になる。\nSame: 同じ数字が出た場合に勝利。所持金が10倍になる。\nPass: めくったカードをスルーする。\n";
	var text2 = "・クリア条件\n所持金1円を1億円に増やすこと";
	var text3 = "なお、山札(35枚)が無くなった時点で\n所持金が1億円に満たなければ即射殺となる。";

	this._drawText(30, 10, 18, CONSTANT.COLOR_WHITE, text0);
	this._drawText(300, 200, 18, CONSTANT.COLOR_WHITE, text1);
	this._drawText(300, 350, 18, CONSTANT.COLOR_WHITE, text2);
	this._drawText(300, 450, 18, CONSTANT.COLOR_WHITE, text3);

	// 魔理沙
	var bg = this.core.image_loader.getImage("rule");
	ctx.save();
	ctx.translate(this.width/2 - 250, this.height/2 + 100);
	ctx.drawImage(bg, -bg.width/2, -bg.height/2);
	ctx.restore();
};
Scene.prototype._drawText = function(x, y, size, color, text){
	var sentences = text.split("\n");
	var ctx = this.core.ctx;
	// 文言
	ctx.save();
	ctx.fillStyle = color;
	ctx.font = size.toString() + "px 'MyFont'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'top';

	for(var i = 0, len = sentences.length; i < len; i++) {
		y += size * 1.5;
		ctx.fillText(sentences[i], x, y); // 1行表示

	}

	ctx.restore();
};

module.exports = Scene;
