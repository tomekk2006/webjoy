const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron');
const path = require('node:path');
const { URL } = require('node:url')
const createWindow = () => {
    // window config
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname+'/assets/icon.png'),
        titleBarStyle:'hidden',
        webPreferences:{
            preload: path.join(__dirname+'/preload.js'),
            webviewTag: true,
        }
    });
    win.setMenu(null); // remove menu
    win.webContents.loadFile(path.join(__dirname+'/main.html'));

    // navbar events
    ipcMain.on('window', (event, type)=> {
        switch (type) {
            case 'close':
                win.close()
                break;
            case 'maximize':
                if (win.isMaximized()) win.restore();
                else win.maximize();
                break;
            case 'minimize':
                win.minimize();
                break;
        }
    });
    // open app dev tools
    ipcMain.on('devtools', ()=>{
        win.webContents.openDevTools();
    });
}
app.whenReady().then(() => {
    createWindow();
})