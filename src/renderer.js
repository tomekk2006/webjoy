const webview = document.getElementById('webview');
const urlText = document.querySelector('.url-text');

// Tooltips
tooltips = [
    {id:'close', fn: ()=> electron.close()},
    {id:'minimize', fn: () => electron.minimize()},
    {id:'maximize', fn: () => electron.maximize()},
    {id:'dev', fn: () => webview.openDevTools()},
    {id:'refresh', fn: () => webview.reload()}
]
tooltips.forEach((tooltip)=> {
    document.getElementById(tooltip.id).addEventListener('click', (ev) => {
        tooltip.fn();
    });
});
// Updating url text
webview.addEventListener('did-start-navigation', (details) => {
    if (details.isMainFrame) {
        urlText.textContent = details.url;
    }
});