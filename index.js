const {app, BrowserWindow, ipcMain} = require("electron");
const PSD = require('psd');
const path = require("path");
let win, savepath, queue = [];

function createWindow() {
    win = new BrowserWindow({
        width: 400,
        height: 100
    });

    win.loadURL(`file://${__dirname}/front/dist/index.html`);

    win.focus();

    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

app.on("ready", createWindow);

ipcMain.on("update-savepath", (ev, path) => {
  savepath = path;
  console.log("savepath update to: " + savepath);
});

ipcMain.on("convert-files", (ev, files) => {
  
  for (let i = 0, f; f = files[i]; i++) {
    let basename = path.basename(f, ".psd");
    let lastLoop = i + 1 == files.length;
    let psd = PSD.fromFile(f);
    psd.parse();

    psd.image.saveAsPng(savepath + "/" + basename + ".png");

    if (lastLoop) {
      win.webContents.send("convert-end");
    }
  }
});