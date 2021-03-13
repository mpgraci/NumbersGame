const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu

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
app.on('ready', () =>{
    createWindow();

    const template = [
        {
            label: 'View',
            submenu: [
                {role: 'zoomIn'},
                {role: 'zoomOut'},
                {type: 'separator'},
                {role: 'resetZoom'}
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

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