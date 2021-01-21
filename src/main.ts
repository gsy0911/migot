import { app, BrowserWindow } from "electron";

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
