const { ipcRenderer } = require('electron')
const Store = require('electron-store')
const store = new Store()

// 預設設定
const defaultSettings = {
  displayTime: 0.8,
  fadeSpeed: 200,
  keySize: 'medium',
  fontSize: 18,
  onlyWithModifiers: false,
  showSingleModifiers: true,
  showLetters: true,
  autoStart: false
}

// 載入設定
function loadSettings() {
  const settings = store.get('settings', defaultSettings)

  document.getElementById('displayTime').value = settings.displayTime
  document.getElementById('displayTimeValue').textContent = settings.displayTime

  document.getElementById('fadeSpeed').value = settings.fadeSpeed
  document.getElementById('fadeSpeedValue').textContent = settings.fadeSpeed

  document.getElementById('keySize').value = settings.keySize
  document.getElementById('fontSize').value = settings.fontSize
  document.getElementById('fontSizeValue').textContent = settings.fontSize

  document.getElementById('onlyWithModifiers').checked = settings.onlyWithModifiers
  document.getElementById('showSingleModifiers').checked = settings.showSingleModifiers
  document.getElementById('showLetters').checked = settings.showLetters
  document.getElementById('autoStart').checked = settings.autoStart
}

// 顯示時長滑桿
document.getElementById('displayTime').addEventListener('input', (e) => {
  document.getElementById('displayTimeValue').textContent = e.target.value
})

// 淡出速度滑桿
document.getElementById('fadeSpeed').addEventListener('input', (e) => {
  document.getElementById('fadeSpeedValue').textContent = e.target.value
})

// 字體大小滑桿
document.getElementById('fontSize').addEventListener('input', (e) => {
  document.getElementById('fontSizeValue').textContent = e.target.value
})

// 重置視窗位置
document.getElementById('resetPosition').addEventListener('click', () => {
  store.delete('windowBounds')
  alert('視窗位置已重置，將在下次啟動時套用')
})

// 儲存按鈕
document.getElementById('saveBtn').addEventListener('click', () => {
  const settings = {
    displayTime: parseFloat(document.getElementById('displayTime').value),
    fadeSpeed: parseInt(document.getElementById('fadeSpeed').value),
    keySize: document.getElementById('keySize').value,
    fontSize: parseInt(document.getElementById('fontSize').value),
    onlyWithModifiers: document.getElementById('onlyWithModifiers').checked,
    showSingleModifiers: document.getElementById('showSingleModifiers').checked,
    showLetters: document.getElementById('showLetters').checked,
    autoStart: document.getElementById('autoStart').checked
  }

  store.set('settings', settings)

  // 通知主程序更新設定
  ipcRenderer.send('settings-updated', settings)

  // 關閉視窗
  window.close()
})

// 取消按鈕
document.getElementById('cancelBtn').addEventListener('click', () => {
  window.close()
})

// 載入設定
loadSettings()
