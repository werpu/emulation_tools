const {app, BrowserWindow, remote} = require('electron')
var arguments = process.argv;


let window;

console.log("args", arguments[1])

let isStringArgs =  arguments.length && typeof arguments[0] === 'string' || arguments[0] instanceof String;


const system = isStringArgs && arguments.length > 1 ? arguments[arguments.length - 1] : "coleco-1p";


/**
 * open a fake fullscreen window
 */
function createWindow() {
    window = new BrowserWindow({
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
        webPreferences: {
            nodeIntegration: true
        }
    })
    window.loadFile("html/"+system+'.html');
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

