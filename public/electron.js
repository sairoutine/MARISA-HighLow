// electron エントリポイント
'use strict';
const electron = require('electron');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

let mainWindow;

function createWindow () {
	// dialog 表示
	var fullscreen_answer = dialog.showMessageBox({
		type: 'question',
		buttons: ['Yes', 'No'],
		title: 'フルスクリーン起動',
		message: 'フルスクリーンで起動しますか？'
	});

	// fullscreen
	if(fullscreen_answer === 0) {
		mainWindow = new BrowserWindow({
			fullscreen: true,
		});
	}
	// not fullscreen
	else {
		mainWindow = new BrowserWindow({
			"width":          640,
			"height":         480,
			"useContentSize": true,  // フレームのサイズをサイズに含まない
			"resizable":      false, // ウィンドウのリサイズを禁止
			"alwaysOnTop":    true,  // 常に最前面
		});

	}

	mainWindow.loadURL(`file://${__dirname}/index.html`);
	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// if fullscreen
	if(fullscreen_answer === 0) {
		mainWindow.webContents.executeJavaScript(`
			window.changeFullScreen();
		`, true);
	}

	var is_show_dialog = false;

	const ret = globalShortcut.register('Escape', function() {
		if(is_show_dialog) return;

		is_show_dialog = true;
		var quit_answer = dialog.showMessageBox({
			type: 'question',
			buttons: ['Yes', 'No'],
			title: '終了',
			message: 'ゲームを終了しますがよろしいですか？'
		});
		if(quit_answer === 0) {
			app.quit();
		}
		is_show_dialog = false;
	});

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('will-quit', () => {
	// Unregister all shortcuts.
	globalShortcut.unregisterAll();
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});
