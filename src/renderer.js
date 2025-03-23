const webview = document.getElementById('webview');
const urlText = document.querySelector('.url-text');

tooltips = [
    {id:'close', fn: ()=> electron.close()},
    {id:'minimize', fn: () => electron.minimize()},
    {id:'maximize', fn: () => electron.maximize()},
    {id:'dev', fn: () => electron.devtools()},
    {id:'refresh', fn: () => webview.reload()}
]
tooltips.forEach((tooltip)=> {
    document.getElementById(tooltip.id).addEventListener('click', (ev) => {
        tooltip.fn();
    });
});

webview.addEventListener('will-navigate', (details) => {
    urlText.textContent = details.url;
});
webview.addEventListener('did-navigate-in-page', (details) => {
    urlText.textContent = details.url;
});