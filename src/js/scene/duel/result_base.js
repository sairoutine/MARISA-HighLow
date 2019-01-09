'use strict';

var BaseScene = require('./base');

var Util = require('../../hakurei').Util;

var SceneDuelResultBase = function(core) {
	BaseScene.apply(this, arguments);

};
Util.inherit(SceneDuelResultBase, BaseScene);

module.exports = SceneDuelResultBase;
