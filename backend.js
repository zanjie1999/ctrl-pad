// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const electron = require("electron");
// const child_process = require('child_process')

// // run vite in shell
// child_process.exec("vite");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    },
    fullscreen: electron.screen.getPrimaryDisplay().workAreaSize.height <= 720,
    autoHideMenuBar: true,
    // resizable: false,
    // frame: false,
  })

  // 忽略X-Frame-Options 让页面强制允许被嵌入
  mainWindow.webContents.session.webRequest.onHeadersReceived({ urls: [ "*://*/*" ] },
    (d, c)=>{
      c({cancel: false, responseHeaders: {
        ...d.responseHeaders,
        'Content-Security-Policy': []
      }});
    }
  );

  // 最小化窗口
  ipcMain.on('minimize', (event, arg) => {
    mainWindow.minimize();
  });

  // and load the index.html of the app.
  // if (process.env.VITE_DEV) {
    mainWindow.loadURL('http://localhost:3000/')
  // } else {
  //   mainWindow.loadFile('dist/index.html')
  // }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: path.join(__dirname, filePath),
    icon: 'src/assets/logo.png'
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


// 获取所有的背景图片
ipcMain.on('getBgImgList', (event, arg) => {
  flist = fs.readdirSync(path.join(__dirname, 'src/assets/bg'));
  if (flist) {
    event.sender.send('getBgImgList', '', flist);
  } else {
    event.sender.send('getBgImgList', '没有背景图片 请将图片放到 src/assets/bg');
  }
});

// 解析rss
let Parser = require('rss-parser');
ipcMain.on('rssParser', async (event, args) => {
  // if (typeof rssUrl === 'string') {
  //   rssUrls = [rssUrl];
  // }
  rssUrls = [
    "https://news.google.com/rss?hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    "https://www.zhihu.com/rss",
  ]
  let parser = new Parser();
  items = [];
  rssUrls.forEach((url) => {
    // let feed = await parser.parseURL(url);
    // items.push(feed.items);
  })
  event.sender.send('rssParser', items);
})