'use strict';
var UIParts = require('../hakurei').Object.UIParts;
var CONSTANT = require('../constant');

var GenerateButton = {};

GenerateButton.exec = function (scene) {
	var no_button  = new UIParts(scene,  scene.width/2 - 90, scene.height/2 + 20, 180 * 0.75, 30 * 1.5, _buttonDrawer("シェアしない"));
	var yes_button = new UIParts(scene,  scene.width/2 + 90, scene.height/2 + 20, 180 * 0.75, 30 * 1.5, _buttonDrawer("シェアする"));
	return {
		no_button: no_button,
		yes_button: yes_button,
	};
};
function _buttonDrawer (text) {
	return function() {
		var ctx = this.core.ctx;
		var logo;
		if (this.onmouse) {
			logo = this.core.image_loader.getImage("button_gray");
		}
		else {
			logo = this.core.image_loader.getImage("button_white");
		}

		var offset_x = 0;
		var offset_y = 0;
		if (this.isclick) {
			offset_x = 3;
			offset_y = 3;
		}

		ctx.save();
		ctx.drawImage(logo,
			this.getCollisionLeftX() + offset_x,
			this.getCollisionUpY() + offset_y,
			this.collisionWidth(),
			this.collisionHeight()
		);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.font = "20px 'MyFont'";
		ctx.fillStyle = CONSTANT.COLOR_BLACK;

		ctx.fillText(text, this.x() + offset_x, this.y() + offset_y);

		ctx.restore();
	};
}

module.exports = GenerateButton;
