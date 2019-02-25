'use strict';

var Hakurei = require('../../hakurei');
var CONSTANT = require('../../constant');
var GenerateButton = require('../../logic/generate_clear_button');

var SceneClearBase = function(core) {
	Hakurei.Scene.Base.apply(this, arguments);

	// 確認モーダル
	var modal = new Hakurei.Object.UI.Group(this, {
		x: this.width/2,
		y: this.height/2,
		width: 360,
		height: 120,
		backgroundColor: "black",
		alpha: 0.8,
		children: [
			new Hakurei.Object.UI.Text(this, {
				x: this.width/2,
				y: this.height/2 - 20,
				text: "結果をTwitterにシェアする？",
				textColor: CONSTANT.COLOR_WHITE,
				textSize: "26px",
				textAlign: "center",
				textFont: "MyFont",
			}),
		],
	});

	var buttons = GenerateButton.exec(this);
	this._yes_button = buttons.yes_button;
	this._no_button = buttons.no_button;

	this.addObjects([modal, this._yes_button, this._no_button]);
};
Hakurei.Util.inherit(SceneClearBase, Hakurei.Scene.Base);

SceneClearBase.prototype.init = function(){
	Hakurei.Scene.Base.prototype.init.apply(this, arguments);
};

SceneClearBase.prototype.update = function() {
	Hakurei.Scene.Base.prototype.update.apply(this, arguments);

	var x = this.core.input_manager.mousePositionX();
	var y = this.core.input_manager.mousePositionY();

	if(this.core.input_manager.isLeftClickPush()) {
		// シェアする
		if(this._yes_button.checkCollisionWithPosition(x, y)) {
			// サブシーンは戻る
			this.parent.returnSubScene("main");

			// atsumaru_share_dialog サブシーン自体は表示させたくないので、main に遷移するまで少し待つ
			this.core.time_manager.setTimeout(function () {
				// シェアモーダルを開く
				window.RPGAtsumaru.experimental.screenshot.displayModal();
			}, 5);

			this._yes_button.setVariable("isclick", true);
		}
		// シェアしない
		else if(this._no_button.checkCollisionWithPosition(x, y)) {
			// クリア画面を終えて、次のシーンへ
			this.parent.exit();

			this._no_button.setVariable("isclick", true);
		}
	}
	else {
		var buttons = [this._no_button, this._yes_button];
		for (var i = 0, len = buttons.length; i < len; i++) {
			var button = buttons[i];
			if(button.checkCollisionWithPosition(x, y)) {
				button.setVariable("onmouse", true);
			}
			else {
				button.setVariable("onmouse", false);
			}

			button.setVariable("isclick", false);
		}

	}
};

module.exports = SceneClearBase;
