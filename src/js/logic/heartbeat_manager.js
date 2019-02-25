'use strict';

// 心音サウンド管理

var Util = require('../hakurei').util;
var BaseObject = require('../hakurei').Object.Base;

var HeartBeatManager = function(scene) {
	BaseObject.apply(this, arguments);

	this._next_heart_rate = 0;
	this._prev_heart_rate = 0;

	// 現在の心拍数
	this._current_heart_rate = 0;
};
Util.inherit(HeartBeatManager, BaseObject);

HeartBeatManager.prototype.init = function(){
	BaseObject.prototype.init.apply(this, arguments);

	this._next_heart_rate = 60;
	this._prev_heart_rate = 0;

	// 現在の心拍数
	this._current_heart_rate = this._next_heart_rate;
};

HeartBeatManager.prototype.update = function(){
	BaseObject.prototype.update.apply(this, arguments);

	if (this._next_heart_rate !== 0) { // 心肺停止でなければ
		if (this.frame_count % this._current_heart_rate === 0) {
			// 心音 SE
			this.core.audio_loader.playSound("heartbeat");

			// 心拍数を加速／減速
			if (this._next_heart_rate !== this._current_heart_rate) {
				// 心拍数の変更で、心音SEが重ならないようにするため
				this.frame_count = 0;

				// 以前の心拍数を保存しておく
				this._prev_heart_rate = this._current_heart_rate;

				// 心拍数 変更
				this._current_heart_rate = this._next_heart_rate;
			}
		}
	}
};

// 加速
HeartBeatManager.prototype.accelerate = function() {
	this._next_heart_rate -= 5;
};

// 急加速
HeartBeatManager.prototype.accelerateFaster = function() {
	this._next_heart_rate = 30;
};

// 平静に戻る
HeartBeatManager.prototype.calmDown = function() {
	this._next_heart_rate = this._prev_heart_rate;
}

// 心音停止
HeartBeatManager.prototype.stop = function() {
	this._next_heart_rate = 0;
};

module.exports = HeartBeatManager;
