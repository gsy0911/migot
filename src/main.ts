import { app, BrowserWindow, globalShortcut } from "electron";
import { TrayMenu } from "./TrayMenu";

let tray = null;

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			nodeIntegrationInWorker: false,
			contextIsolation: true,
		},
	});

	void win.loadFile("./index.html");

	win.webContents.openDevTools();
};

void app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on("ready", function () {
	globalShortcut.register("alt+space", function () {
		// get focused window
		const window = BrowserWindow.getFocusedWindow();
		// window shown or not
		window ? hideWindow(window) : showWindow();
	});

	tray = new TrayMenu();
});

function showWindow() {
	// detect blur event of BrowserWindow
	app.focus({ steal: true });
	app.show();
}

function hideWindow(window: BrowserWindow) {
	// window is shown in center
	window.center();
	app.hide();
}
