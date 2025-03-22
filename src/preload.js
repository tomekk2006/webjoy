const { contextBridge, ipcRenderer, app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    close: () => ipcRenderer.send('window', 'close'),
    maximize: () => ipcRenderer.send('window', 'maximize'),
    minimize: () => ipcRenderer.send('window', 'minimize'),
    devtools: () => ipcRenderer.send('devtools'),
});