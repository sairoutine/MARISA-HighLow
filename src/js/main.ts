import Game from "./game";
import CONSTANT from "./constant";

interface RPGAtsumaru {
	experimental: {
		screenshot?: {
			setScreenshotHandler?: (fn: () => Promise<string>) => void;
			displayModal?: () => void;
		};
	};
}

declare global {
	interface Window {
		RPGAtsumaru?: RPGAtsumaru;
		require?: (mod: string) => { webFrame: { setVisualZoomLevelLimits: (a: number, b: number) => void } };
	}
}

window.onload = function () {
	const mainCanvas = document.getElementById("mainCanvas") as HTMLCanvasElement;

	const game = new Game(mainCanvas);

	game.init();
	// デバッグ設定
	if (CONSTANT.DEBUG) {
		const debugDOM = document.getElementById("debug");
		if (debugDOM) {
			game.setupDebug(debugDOM);
		}
	}
	game.setupEvents();

	// RPGアツマールでスクリーションショットが撮れるようにする
	const atsumaru = window.RPGAtsumaru;
	if (
		atsumaru &&
		atsumaru.experimental.screenshot &&
		atsumaru.experimental.screenshot.setScreenshotHandler
	) {
		atsumaru.experimental.screenshot.setScreenshotHandler(function () {
			return new Promise<string>(function (resolve) {
				const base64 = mainCanvas.toDataURL("image/jpeg");
				resolve(base64);
			});
		});
	}

	// モバイル端末及び iOS simulator で、RPGアツマールだと、
	// なぜかゲームロードタイミングによって innerWidth, innerHeight がアツマールに設定したゲーム画面サイズにされてしまうので、
	// 最初にモバイル用サイズを設定し直す。
	if (atsumaru && isMobileDevice()) {
		// innerWidth, innerHeight は readonly プロパティ
		// 経緯があって書き換え可能なブラウザが多い。よって unknown へ一度変換して無理やり書き込み可能にしてる
		(window as unknown as { innerWidth: number }).innerWidth = screen.width;
		(window as unknown as { innerHeight: number }).innerHeight = screen.height;
	}
	game.fullsize();

	game.startRun();
};

function isMobileDevice(): boolean {
	const r = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return !!navigator.userAgent.match(r);
}

// for electron
if (window.require) {
	window.require("electron").webFrame.setVisualZoomLevelLimits(1, 1); // unable to zoom
}
