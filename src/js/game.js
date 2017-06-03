'use strict';
var core = require('./hakurei').core;
var util = require('./hakurei').util;

var Game = function(canvas) {
	core.apply(this, arguments);
};
util.inherit(Game, core);

Game.prototype.init = function () {
	core.prototype.init.apply(this, arguments);
};

module.exports = Game;
