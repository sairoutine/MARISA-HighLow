'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var GenerateButton = require('../../logic/generate_choose_button');


var SceneDuelChoose = function(core) {
	BaseScene.apply(this, arguments);

	var buttons = GenerateButton.exec(this);
	this._pass_button = buttons.pass_button;
	this._high_button = buttons.high_button;
	this._low_button  = buttons.low_button;
	this._same_button = buttons.same_button;
	this._restart_button = buttons.restart_button;

	this.addObjects([this._high_button, this._low_button, this._same_button, this._pass_button, this._restart_button]);


};
Util.inherit(SceneDuelChoose, BaseScene);

SceneDuelChoose.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	// 負け続けている時のみ、restart ボタンを表示する
	this._restart_button.is_not_show = !this.parent.rule_manager.isOnlyLose();
};


SceneDuelChoose.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	var x = this.core.input_manager.mousePositionX();
	var y = this.core.input_manager.mousePositionY();

	if(this.core.input_manager.isLeftClickPush()) {
		if(this._pass_button.checkCollisionWithPosition(x, y)) {
			this.parent.showSerif("Pass!");
			this.parent.rule_manager.pass();

			this._pass_button.setVariable("isclick", true);
		}
		else if(this._high_button.checkCollisionWithPosition(x, y)) {
			this.parent.showSerif("High!");
			this.parent.rule_manager.chooseHigh();

			this._high_button.setVariable("isclick", true);
		}
		else if(this._low_button.checkCollisionWithPosition(x, y)) {
			this.parent.showSerif("Low!");
			this.parent.rule_manager.chooseLow();

			this._low_button.setVariable("isclick", true);
		}
		else if(this._same_button.checkCollisionWithPosition(x, y)) {
			this.parent.showSerif("Same!");
			this.parent.rule_manager.chooseSame();

			this._same_button.setVariable("isclick", true);
		}
		else if(!this.is_not_show && this._restart_button.checkCollisionWithPosition(x, y)) {
			// 即死
			this.parent.changeSubScene("dead");

			this._restart_button.setVariable("isclick", true);
		}

	}
	else {
		var buttons = [this._high_button, this._low_button, this._same_button, this._pass_button, this._restart_button];
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

SceneDuelChoose.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = SceneDuelChoose;
