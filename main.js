const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Store = require('electron-store')
const remoteMain = require('@electron/remote/main')

remoteMain.initialize()

const store = new Store()
let mainWindow

// 監聽滑鼠穿透狀態切換
ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
  if (mainWindow) {
    mainWindow.setIgnoreMouseEvents(ignore, { forward: true })
  }
})

function createWindow() {
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // 固定在螢幕下方中間
  const windowWidth = 400
  const windowHeight = 100
  const x = Math.floor((width - windowWidth) / 2)
  const y = height - windowHeight - 50

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: x,
    y: y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile('index.html')

  // 啟用 remote 模組
  remoteMain.enable(mainWindow.webContents)

  // 初始設定為滑鼠穿透（沒有按鍵時）
  mainWindow.setIgnoreMouseEvents(true, { forward: true })

  // 不開啟 DevTools
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
