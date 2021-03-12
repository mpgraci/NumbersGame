const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 1500,
        height: 900
        
    });    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));    
    //win.setMenuBarVisibility(false);
    win.on('closed', () => {win = null;})    
}
app.on('ready', createWindow);

//Mac
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if(win === null){
        createWindow();
    }
});