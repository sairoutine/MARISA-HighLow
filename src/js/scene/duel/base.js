'use strict';

var BaseScene = require('../../hakurei').Scene.Base;

var Util = require('../../hakurei').Util;

var SceneDuelBase = function(core) {
	BaseScene.apply(this, arguments);

};
Util.inherit(SceneDuelBase, BaseScene);

module.exports = SceneDuelBase;
