'use strict';

var BaseScene = require('./clear_base');

var Util = require('../hakurei').Util;

var Scene = function(core) {
	BaseScene.apply(this, arguments);
};
Util.inherit(Scene, BaseScene);

Scene.prototype.soundName = function(){
	return "ex_clear";
};

Scene.prototype.bgName = function(){
	return "ex_clear";
};

module.exports = Scene;
