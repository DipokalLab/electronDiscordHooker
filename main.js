const {app, BrowserWindow, ipcMain } = require('electron')
const request = require('request');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on('send', (event, url, mes) => {
  console.log(url, mes);

  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url: url,
    body: `content=${mes}`
  }, function(error, response, body){
    console.log(body);
  });
});