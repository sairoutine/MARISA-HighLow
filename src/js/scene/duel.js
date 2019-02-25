'use strict';

var BaseScene = require('../hakurei').Scene.Base;

var Util = require('../hakurei').Util;
var CONSTANT = require('../constant');

var RuleManager = require('../logic/rule_manager');

var SceneDuelChoose     = require('./duel/choose');
var SceneDuelDead       = require('./duel/dead');
var SceneDuelResultDraw = require('./duel/result_draw');
var SceneDuelResultLose = require('./duel/result_lose');
var SceneDuelResultPass = require('./duel/result_pass');
var SceneDuelResultWin  = require('./duel/result_win');
var SceneDuelNotReach   = require('./duel/not_reach');
var SceneDuelTutorial   = require('./duel/tutorial');

var Deck = require('../object/deck');
var Marisa = require('../object/marisa');
var Serif = require('../object/serif');

var Scene = function(core) {
	BaseScene.apply(this, arguments);

	this._deck = new Deck(this);

	this._opened_card = null;

	// サブシーン
	this.addSubScene("choose", new SceneDuelChoose(core));
	this.addSubScene("dead", new SceneDuelDead(core));
	this.addSubScene("draw", new SceneDuelResultDraw(core));
	this.addSubScene("lose", new SceneDuelResultLose(core));
	this.addSubScene("pass", new SceneDuelResultPass(core));
	this.addSubScene("win",  new SceneDuelResultWin(core));
	this.addSubScene("not_reach", new SceneDuelNotReach(core));
	this.addSubScene("tutorial", new SceneDuelTutorial(core));

	this._marisa = new Marisa(this);
	this._serif = new Serif(this);
	this.rule_manager = new RuleManager(this);
	this.addObjects([this._marisa, this._serif, this.rule_manager]);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);

	this._deck.init();

	this.setNewCard();

	if (this.core.is_finish_tutorial) {
		this.changeSubScene("choose");
	}
	else {
		this.core.is_finish_tutorial = true;
		this.changeSubScene("tutorial");
	}
};


Scene.prototype.setNewCard = function(){
	this._opened_card = this._deck.serve();
	this._opened_card.setPosition(CONSTANT.OPEN_CARD_X, CONSTANT.OPEN_CARD_Y);

	if (this._deck.topCard()) {
		this._deck.topCard().setPosition(CONSTANT.TOP_CARD_X, CONSTANT.TOP_CARD_Y);
	}
};

Scene.prototype.marisa = function(){
	return this._marisa;
};

Scene.prototype.deck = function(){
	return this._deck;
};
Scene.prototype.opendCard = function(){
	return this._opened_card;
};

// セリフ表示
Scene.prototype.showSerif = function(text){
	this._serif.show(text);
};

// セリフ消滅
Scene.prototype.startSerifExtinguish = function(){
	this._serif.startExtinguish();
};

Scene.prototype.update = function(){
	BaseScene.prototype.update.apply(this, arguments);

	// 左クリック位置を出力
	if (CONSTANT.DEBUG) {
		if(this.core.input_manager.isLeftClickPush()) {
			var x = this.core.input_manager.mousePositionX();
			var y = this.core.input_manager.mousePositionY();

			console.log("x: " + x + ", y: " + y);
		}
	}


};

Scene.prototype.draw = function(){
	var ctx = this.core.ctx;
	// 背景
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_BLACK;
	ctx.fillRect(0, 0, this.width, this.height);

	var spotlight = this.core.image_loader.getImage("spotlight");
	ctx.drawImage(spotlight, 200, -100, spotlight.width, spotlight.height);
	ctx.restore();

	this._deck.draw();

	// 既に開かれたカードの描画
	this._opened_card.draw();

	// 候補カードの描画
	if (this._deck.topCard()) {
		this._deck.topCard().draw();
	}

	// デッキ残り枚数の描画
	var deck_num = this._deck.count();
	ctx.save();
	ctx.fillStyle = CONSTANT.COLOR_WHITE;
	ctx.font = "36px 'MyFont'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'top';

	ctx.fillText("残りのカード：" + deck_num + "枚", 50, 550);

	// 所持金
	ctx.fillText("所持金：" + this.rule_manager.money() + "円", 50, 600);
	ctx.restore();

	BaseScene.prototype.draw.apply(this, arguments);
};

module.exports = Scene;
