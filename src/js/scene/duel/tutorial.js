'use strict';

var BaseScene = require('./base');
var Util = require('../../hakurei').Util;
var GenerateButton = require('../../logic/generate_choose_button');
var CONSTANT = require('../../constant');


// 1行15文字まで
var STEPS = [
	{"x": 120, "y": 200, "window": "balloon_up_left", "text": "左のカードが、右のカードより\n大きいか小さいか当てる"},
	{"x": 200, "y": 450, "window": "balloon_up_left", "text": "左のカードの数字の方が大きいと\n思えば High を押す"},
	{"x": 290, "y": 450, "window": "balloon_up_left", "text": "左のカードの数字の方が小さいと\n思えば Low を押す"},
	{"x": 370, "y": 450, "window": "balloon_up_left", "text": "左のカードと右のカードの数字が\n同じだと思えば Same を押す"},
	{"x": 370, "y": 450, "window": "balloon_up_left", "text": "Same が当たれば、所持金が\n10倍になる"},
	{"x": 100, "y": 450, "window": "balloon_up_left", "text": "わからなければ Pass を\n押せばスルーできる"},
	{"x": 100, "y": 450, "window": "balloon_up_left", "text": "Pass にデメリットはない\n何回でも Pass できる"},
	{"x": 150, "y": 330, "window": "balloon_down_left", "text": "まだ出現したことのないカードは\nここに表示される"},
	{"x": 500, "y": 150, "window": "balloon_up_right", "text": "所持金が1億を超えると\n霧雨魔理沙は解放される"},
	{"x": 150, "y": 550, "window": "balloon_up_left", "text": "所持金が1億を超えてもゲームは続く\nPass し続ければゲームは終わる"},
	{"x": 150, "y": 550, "window": "balloon_up_left", "text": "それでは健闘を祈る"},
];

var MESSAGE_OFFSET_X = -110;

// ウィンドウの大きさ
var WINDOW_SCALE = {
	WIDTH: 2,
	HEIGHT: 1,
};



var SceneDuelTutorial = function(core) {
	BaseScene.apply(this, arguments);

	this._step = 0;

	var buttons = GenerateButton.exec(this);
	this._pass_button = buttons.pass_button;
	this._high_button = buttons.high_button;
	this._low_button  = buttons.low_button;
	this._same_button = buttons.same_button;

	this.addObjects([this._high_button, this._low_button, this._same_button, this._pass_button]);
};
Util.inherit(SceneDuelTutorial, BaseScene);

SceneDuelTutorial.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._step = 0;
};


SceneDuelTutorial.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	if(this.core.input_manager.isLeftClickPush()) {
		this._step++;

		// SE再生
		this.core.audio_loader.playSound("next");

		// チュートリアル終了ならば
		if (this._step >= STEPS.length) {
			this.parent.changeSubScene("choose");
		}
	}
};

SceneDuelTutorial.prototype.draw = function(){
	BaseScene.prototype.draw.apply(this, arguments);

	this._drawCurrentStepMessage();
}

SceneDuelTutorial.prototype._drawCurrentStepMessage = function(){
	if (!(this._step in STEPS)) {
		return;
	}

	var data = STEPS[this._step];
	this._drawWindow(data.x, data.y, data.window);
	this._drawText(data.x, data.y, data.window, data.text);
};

SceneDuelTutorial.prototype._drawWindow = function (x, y, window_name) {
	var ctx = this.core.ctx;
	ctx.save();
	ctx.translate(x, y);

	var fukidashi = this.core.image_loader.getImage(window_name);

	// x,y座標は左下が基準位置
	ctx.drawImage(fukidashi,
		0 + MESSAGE_OFFSET_X,
		-fukidashi.height*WINDOW_SCALE.HEIGHT,
		fukidashi.width * WINDOW_SCALE.WIDTH,
		fukidashi.height * WINDOW_SCALE.HEIGHT
	);
	ctx.restore();

};



SceneDuelTutorial.prototype._drawText = function(x, y, window_name, text){
	var fukidashi = this.core.image_loader.getImage(window_name);
	y -= fukidashi.height*WINDOW_SCALE.HEIGHT - 40;
	x += MESSAGE_OFFSET_X + 50;

	var font_size = 18;

	var sentences = text.split("\n");
	var ctx = this.core.ctx;
	// 文言
	ctx.save();
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

module.exports = SceneDuelTutorial;
