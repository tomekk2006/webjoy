const { app, BaseWindow, BrowserWindow, WebContentsView } = require('electron')

const createWindow = () => {
    const win = new BaseWindow({
        width: 800,
        height: 600,
        icon: "./assets/icon.png",
        title: "Webjoy"
    });
    win.setMenu(null);
    const urlBar = new WebContentsView();
    urlBar.webContents.loadFile("./views/navbar.html");
    const mainContent = new WebContentsView();
    mainContent.webContents.loadURL('https://youtube.com');
    mainContent.webContents.scree
    // add children to main view
    win.contentView.addChildView(urlBar);
    win.contentView.addChildView(mainContent);



    // manage view sizes
    function resizeViews(fullscreen=false) {
        const contentSize = win.contentView.getBounds();
        if (!fullscreen) {
            urlBar.setBounds({ x: 0, y: 0, width: contentSize.width, height: 32 });
            mainContent.setBounds({ x: 0, y: 32, width: contentSize.width, height: contentSize.height - 32 });
        }
        else {
            urlBar.setBounds({ x: 0, y: 0, width: contentSize.width, height: 0 });
            mainContent.setBounds({ x: 0, y: 0, width: contentSize.width, height: contentSize.height });
        }
        
    }
    resizeViews();
    win.on('resize', () => {
        if (!win.fullScreen) {
            resizeViews(false);
        }
        else {
            resizeViews(true);
        }
        
    });
    // on navigation update the url bar
    mainContent.webContents.on('did-navigate-in-page', (event, url) => {
        urlBar.webContents.executeJavaScript(`document.querySelector('.url-text').textContent = '${url}'`);
    });
    mainContent.webContents.on('did-redirect-navigation', (details) => {
        urlBar.webContents.executeJavaScript(`document.querySelector('.url-text').textContent = '${details.url}'`);
    });
}

app.whenReady().then(() => {
    createWindow();
})