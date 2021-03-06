/**
 * main index.js, this is basically
 * just a starter for the main window with all needed hooks in place
 * the rest is done in the browser itself once needed
 * or by preload to preinit values
 */
const {app, BrowserWindow, remote} = require('electron');
const path = require('path');

let _sharedObj = {
    receivers: {},
    receiver: {}
};

Object.defineProperty(global, 'sharedObj', {
  get() { return _sharedObj },
  set(value) { _sharedObj = value }
})

require("./scripts/backend/udpreceiver.js");

let theArgs = process.argv;



const isStringArgs =  theArgs.length && typeof theArgs[0] === 'string' || theArgs[0] instanceof String;
const system = isStringArgs && theArgs.length > 1 ? theArgs[theArgs.length - 1] : "coleco-1p";

global.sharedObj["initialSystem"] = system;




/**
 * open a fake fullscreen window
 */
function createWindow() {
    window = new BrowserWindow({
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        },
        /*raspberry pi screen size*/
        width: 800,
        height: 480,
        x: 0,
        y: 0,
        alwaysOnTop: true,
        title: system,
        //frame: false,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        fullScreen: true,
        nodeIntegration: true

    })

    window.setFullScreenable(true);
    window.setFullScreen(true);
    window.loadFile(path.join(app.getAppPath(),"html/index.html"));
    //window.webContents.openDevTools();
}


app.on('ready', createWindow)

app.on('did-finish-load', () => {


});

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});


module.exports = app;

