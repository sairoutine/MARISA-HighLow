'use strict';
var Util = require('./hakurei').Util;
var CONSTANT = {
	DEBUG: false,
	DEBUG_MUTE: false,
	DEBUG_SCENE: "rule",

	TYPE_RED:    0,
	TYPE_BLUE:   1,
	TYPE_GREEN:  2,
	TYPE_PURPLE: 3,

	COLOR_BLACK:  Util.hexToRGBString("272727"),
	COLOR_WHITE:  Util.hexToRGBString("FBF5F3"),
	COLOR_RED:    Util.hexToRGBString("DB2B39"),
	COLOR_BLUE:   Util.hexToRGBString("0A34DB"),
	COLOR_GREEN:  Util.hexToRGBString("317B22"),
	COLOR_PURPLE: Util.hexToRGBString("801A86"),
	COLOR_VIVID_RED: "red",

	OPEN_CARD_X: 330,
	OPEN_CARD_Y: 330,

	TOP_CARD_X: 130,
	TOP_CARD_Y: 330,

	MARISA_CENTER_X: 600,
	MARISA_CENTER_Y: 350,

	CLEAR_NEED_MONEY: 100000000,
	EX_CLEAR_NEED_MONEY: 2000000000,
};
module.exports = CONSTANT;
