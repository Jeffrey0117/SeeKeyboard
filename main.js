const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const Store = require('electron-store')
const remoteMain = require('@electron/remote/main')

remoteMain.initialize()

const store = new Store()
let mainWindow
let settingsWindow
let tray

// 監聽滑鼠穿透狀態切換
ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
  if (mainWindow) {
    if (ignore) {
      // 完全穿透
      mainWindow.setIgnoreMouseEvents(true, { forward: true })
    } else {
      // 不穿透，可以互動
      mainWindow.setIgnoreMouseEvents(false)
    }
  }
})

// 監聽設定更新
ipcMain.on('settings-updated', (event, settings) => {
  // 通知主視窗重新載入設定
  if (mainWindow) {
    mainWindow.webContents.send('settings-changed', settings)
  }
})

// 建立系統托盤
function createTray() {
  const { nativeImage } = require('electron')

  // 創建一個簡單的圖示（16x16，深色背景，白色 K 字）
  const canvas = `
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" fill="#333333" rx="3"/>
      <text x="8" y="13" font-family="Arial" font-size="12" font-weight="bold"
            fill="white" text-anchor="middle">K</text>
    </svg>
  `

  const icon = nativeImage.createFromDataURL(
    'data:image/svg+xml;base64,' + Buffer.from(canvas).toString('base64')
  )

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '設定',
      click: () => {
        createSettingsWindow()
      }
    },
    {
      label: '重新載入',
      click: () => {
        if (mainWindow) {
          mainWindow.reload()
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('SeeKeyboard')
  tray.setContextMenu(contextMenu)

  // 點擊托盤圖示開啟設定
  tray.on('click', () => {
    createSettingsWindow()
  })
}

// 建立設定視窗
function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus()
    return
  }

  settingsWindow = new BrowserWindow({
    width: 650,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  settingsWindow.loadFile('settings.html')

  settingsWindow.on('closed', () => {
    settingsWindow = null
  })
}

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
}

app.whenReady().then(() => {
  createWindow()
  createTray()

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
