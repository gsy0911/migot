import { app, Tray, Menu, nativeImage } from "electron";
import path from "path";

export class TrayMenu {
	// Create a variable to store our tray
	// Public: Make it accessible outside of the class;
	// Readonly: Value can't be changed
	public readonly tray: Tray;

	// Path where should we fetch our icon;
	private iconPath = path.join(__dirname + "/assets/icon.png");

	constructor() {
		this.tray = new Tray(this.createNativeImage());
		this.tray.setContextMenu(this.createContextMenu());
	}

	createNativeImage(): nativeImage {
		// Since we never know where the app is installed,
		// we need to add the app base path to it.
		const path = this.iconPath;
		const image = nativeImage.createFromPath(path);
		// Marks the image as a template image.
		image.setTemplateImage(true);
		return image;
	}

	createContextMenu(): Menu {
		const contextMenu = Menu.buildFromTemplate([
			{
				label: "menu 1",
				type: "radio",
				click: () => console.log("clicked"),
			},
			{ label: "menu 2", type: "radio" },
			{ type: "separator" },
			{
				label: "sub-menu",
				submenu: [{ label: "sub-menu 1" }, { label: "sub-menu2" }],
			},
			{
				label: "Quit",
				accelerator: "Command+Q",
				click: function () {
					app.quit();
				},
			},
		]);
		return contextMenu;
	}
}
