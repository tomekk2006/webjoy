const { app, BaseWindow, BrowserWindow, WebContentsView } = require('electron')

const createWindow = () => {
  const win = new BaseWindow({
    width: 800,
    height: 600,
    icon: "./bitmap.png",
    title: "Webjoy"
  });
  win.setMenu(null);

  const urlBar = new WebContentsView();
  urlBar.webContents.loadFile("./index.html");
  const mainContent = new WebContentsView();
  mainContent.webContents.loadURL('https://youtube.com');
  // add children to main view
  win.contentView.addChildView(urlBar);
  win.contentView.addChildView(mainContent);

  // manage view sizes
  function resizeViews() {
    const contentSize = win.contentView.getBounds();
    urlBar.setBounds({x:0, y:0, width: contentSize.width, height:32});
    mainContent.setBounds({x:0, y:32, width: contentSize.width, height: contentSize.height-32});
  }
  resizeViews();
  win.on('resize',()=>{
    resizeViews();
  });

  // on navigation update the url bar
  mainContent.webContents.on('will-navigate', (details)=>{
    urlBar.webContents.executeJavaScript(`document.querySelector('.url-text').textContent = '${details.url}'`);
  });
  mainContent.webContents.on('will-redirect', (details)=>{
    urlBar.webContents.executeJavaScript(`document.querySelector('.url-text').textContent = '${details.url}'`);
  });
}

app.whenReady().then(() => {
  createWindow();
})