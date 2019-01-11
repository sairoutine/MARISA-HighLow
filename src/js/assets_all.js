'use strict';

// ゲームに必要な素材

var AssetsConfig = {};
AssetsConfig.images = {
	// https://commons.nicovideo.jp/material/nc19968
	"spotlight": "./image/spotlight.png",
	//http://sozai.akuseru-design.com/category/sozai/button/
	"button_white": "./image/button_white.png",
	"button_gray": "./image/button_gray.png",
	// http://www.pasocafe.com/balloon/balloon_01.php
	"balloon_up_left": "./image/balloon_up_left.png",
	"balloon_down_left": "./image/balloon_down_left.png",
	"balloon_up_right": "./image/balloon_up_right.png",
	// http://www.vita-chi.net/message.htm
	"message_window": "./image/message_window.png",

	// from harasaki san
	"ex_clear": "./image/ex_clear.png",
	"clear": "./image/clear.png",
	"rule": "./image/rule.png",
	"revolver": "./image/revolver.png",

	"head_1": "./image/head/1.png",
	"head_2": "./image/head/2.png",
	"head_3": "./image/head/3.png",
	"head_4": "./image/head/4.png",
	"head_dead": "./image/head/died.png",

	"body_1": "./image/body/1.png",
	"body_2": "./image/body/2.png",
	"body_3": "./image/body/3.png",
	"body_4": "./image/body/4.png",
	"body_5": "./image/body/5.png",

	"eye_1_1": "./image/eye/1/1.png",
	"eye_1_2": "./image/eye/1/2.png",
	"eye_1_3": "./image/eye/1/3.png",
	"eye_1_4": "./image/eye/1/4.png",
	"eye_2_1": "./image/eye/2/5.png",
	"eye_2_2": "./image/eye/2/6.png",
	"eye_2_3": "./image/eye/2/7.png",
	"eye_2_4": "./image/eye/2/8.png",
	"eye_3_1": "./image/eye/3/9.png",
	"eye_3_2": "./image/eye/3/10.png",
	"eye_3_3": "./image/eye/3/11.png",
	"eye_3_4": "./image/eye/3/12.png",
	"eye_4_1": "./image/eye/4/13.png",
	"eye_4_2": "./image/eye/4/14.png",
	"eye_4_3": "./image/eye/4/15.png",
	"eye_4_4": "./image/eye/4/16.png",

	"mouse_1_1": "./image/mouse/1/1.png",
	"mouse_1_2": "./image/mouse/1/2.png",
	"mouse_1_3": "./image/mouse/1/3.png",
	"mouse_1_4": "./image/mouse/1/4.png",
	"mouse_2_1": "./image/mouse/2/5.png",
	"mouse_2_2": "./image/mouse/2/6.png",
	"mouse_2_3": "./image/mouse/2/7.png",
	"mouse_2_4": "./image/mouse/2/8.png",
	"mouse_3_1": "./image/mouse/3/9.png",
	"mouse_3_2": "./image/mouse/3/10.png",
	"mouse_3_3": "./image/mouse/3/11.png",
	"mouse_3_4": "./image/mouse/3/12.png",
	"mouse_4_1": "./image/mouse/4/13.png",
	"mouse_4_2": "./image/mouse/4/14.png",
	"mouse_4_3": "./image/mouse/4/15.png",
	"mouse_4_4": "./image/mouse/4/16.png",
};

AssetsConfig.sounds = {
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_se_heartbeat01.html
	"heartbeat": {
		path: "./sound/heartbeat",
		volume: 0.6,
	},
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_system15.html
	"lose": {
		path: "./sound/lose",
		volume: 1.0,
	},
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_system34.html
	"win": {
		path: "./sound/win",
		volume: 1.0,
	},
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_system38.html
	"draw": {
		path: "./sound/draw",
		volume: 1.0,
	},
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_system42.html
	"pass": {
		path: "./sound/pass",
		volume: 1.0,
	},
	// https://maoudamashii.jokersounds.com/archives/se_maoudamashii_se_sound12.html
	"next": {
		path: "./sound/next",
		volume: 1.0,
	},
	// 銃を構える https://soundeffect-lab.info/sound/battle/battle2.html
	"revolver_prepare": {
		path: "./sound/revolver_prepare",
		volume: 1.0,
	},
	// 拳銃1 https://soundeffect-lab.info/sound/battle/battle2.html
	"revolver_fire": {
		path: "./sound/revolver_fire",
		volume: 1.0,
	},
	// 鞘を持つ音 https://soundeffect-lab.info/sound/battle/
	"revolver_not_fire": {
		path: "./sound/revolver_not_fire",
		volume: 1.0,
	},
	// 歓声と拍手2 https://soundeffect-lab.info/sound/voice/people.html
	"clear": {
		path: "./sound/clear",
		volume: 1.0,
	},
	// 歓声と拍手1 https://soundeffect-lab.info/sound/voice/people.html
	"ex_clear": {
		path: "./sound/ex_clear",
		volume: 1.0,
	},
};

AssetsConfig.bgms = {
};

AssetsConfig.fonts = {
	// ロゴたいぷゴシックコンデンスド
	// http://www.fontna.com/%E3%83%AD%E3%82%B4%E3%81%9F%E3%81%84%E3%81%B7%E3%82%B4%E3%82%B7%E3%83%83%E3%82%AF%E3%82%B3%E3%83%B3%E3%83%87%E3%83%B3%E3%82%B9%E3%83%89/
	"MyFont": {
		path: "07LogoTypeGothic-Condense.ttf",
		format: "truetype",
	},
};


module.exports = AssetsConfig;
