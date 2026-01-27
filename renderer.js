const { uIOhook, UiohookKey } = require('uiohook-napi')
const { remote } = require('@electron/remote')

const keysContainer = document.getElementById('keys-container')
let currentKeys = new Set()
let lastDisplayedKeys = []
let fadeTimeout = null
let updateTimeout = null

// 按鍵映射表 - 使用 uiohook-napi 的標準 keycode
const keyMap = {
  // 修飾鍵
  29: 'Ctrl',
  3613: 'Ctrl',  // Right Ctrl
  42: 'Shift',
  54: 'Shift',   // Right Shift
  56: 'Alt',
  3640: 'Alt',   // Right Alt
  3675: 'Win',

  // 特殊鍵
  1: 'Esc',
  14: 'Backspace',
  15: 'Tab',
  28: 'Enter',
  57: 'Space',
  58: 'Caps Lock',

  // 方向鍵
  57416: '↑',
  57424: '←',
  57421: '↓',
  57419: '→',

  // 功能鍵
  59: 'F1', 60: 'F2', 61: 'F3', 62: 'F4',
  63: 'F5', 64: 'F6', 65: 'F7', 66: 'F8',
  67: 'F9', 68: 'F10', 87: 'F11', 88: 'F12',

  // 其他特殊鍵
  3666: 'End',
  3667: 'Home',
  3663: 'PgUp',
  3665: 'PgDn',
  3637: 'Insert',
  3639: 'Delete',

  // 數字鍵
  2: '1', 3: '2', 4: '3', 5: '4', 6: '5',
  7: '6', 8: '7', 9: '8', 10: '9', 11: '0',

  // 字母鍵 (正確的 keycode 映射)
  30: 'A', 48: 'B', 46: 'C', 32: 'D', 18: 'E',
  33: 'F', 34: 'G', 35: 'H', 23: 'I', 36: 'J',
  37: 'K', 38: 'L', 50: 'M', 49: 'N', 24: 'O',
  25: 'P', 16: 'Q', 19: 'R', 31: 'S', 20: 'T',
  22: 'U', 47: 'V', 17: 'W', 45: 'X', 21: 'Y',
  44: 'Z',

  // 符號鍵
  12: '-', 13: '=', 26: '[', 27: ']',
  39: ';', 40: "'", 41: '`', 43: '\\',
  51: ',', 52: '.', 53: '/'
}

// 顯示按鍵
function displayKeys(keyArray) {
  keysContainer.innerHTML = ''

  if (keyArray.length === 0) {
    // 沒有按鍵時，讓滑鼠穿透
    document.body.style.pointerEvents = 'none'
    return
  }

  // 有按鍵時，允許滑鼠互動
  document.body.style.pointerEvents = 'auto'

  keyArray.forEach((key, index) => {
    // 添加按鍵元素
    const keyElement = document.createElement('div')
    keyElement.className = 'key'
    keyElement.textContent = key
    keysContainer.appendChild(keyElement)

    // 如果不是最後一個按鍵，添加 "+" 分隔符
    if (index < keyArray.length - 1) {
      const plusElement = document.createElement('div')
      plusElement.className = 'key-separator'
      plusElement.textContent = '+'
      keysContainer.appendChild(plusElement)
    }
  })

  // 記錄最後顯示的按鍵組合
  lastDisplayedKeys = [...keyArray]
}

// 開始淡出動畫
function startFadeOut() {
  if (fadeTimeout) {
    clearTimeout(fadeTimeout)
  }

  fadeTimeout = setTimeout(() => {
    const elements = document.querySelectorAll('.key, .key-separator')
    elements.forEach(el => el.classList.add('fade-out'))

    // 淡出動畫結束後清空
    setTimeout(() => {
      keysContainer.innerHTML = ''
      lastDisplayedKeys = []
      // 清空後允許滑鼠穿透
      document.body.style.pointerEvents = 'none'
    }, 500)
  }, 2500)
}

// 鍵盤按下事件
uIOhook.on('keydown', event => {
  const keyName = keyMap[event.keycode]

  if (keyName) {
    // 取消淡出計時器（如果有新按鍵按下）
    if (fadeTimeout) {
      clearTimeout(fadeTimeout)
      fadeTimeout = null
    }

    // 取消更新計時器
    if (updateTimeout) {
      clearTimeout(updateTimeout)
      updateTimeout = null
    }

    currentKeys.add(keyName)
    displayKeys(Array.from(currentKeys))
  }
})

// 鍵盤釋放事件
uIOhook.on('keyup', event => {
  const keyName = keyMap[event.keycode]

  if (keyName) {
    currentKeys.delete(keyName)

    // 取消之前的更新計時器
    if (updateTimeout) {
      clearTimeout(updateTimeout)
    }

    // 延遲 150ms 後才更新顯示（讓組合鍵一起放開時不會閃爍）
    updateTimeout = setTimeout(() => {
      // 如果所有按鍵都放開了，啟動淡出計時器
      if (currentKeys.size === 0) {
        startFadeOut()
      }
      // 如果還有按鍵按著，更新顯示
      else {
        displayKeys(Array.from(currentKeys))
      }
    }, 150)
  }
})

// 啟動鍵盤監聽
uIOhook.start()

// 初始狀態允許滑鼠穿透
document.body.style.pointerEvents = 'none'

// 視窗拖曳功能
let isDragging = false
let dragOffset = { x: 0, y: 0 }

document.body.addEventListener('mousedown', (e) => {
  isDragging = true
  const bounds = remote.getCurrentWindow().getBounds()
  dragOffset.x = e.screenX - bounds.x
  dragOffset.y = e.screenY - bounds.y
})

document.body.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const window = remote.getCurrentWindow()
    window.setPosition(
      Math.round(e.screenX - dragOffset.x),
      Math.round(e.screenY - dragOffset.y)
    )
  }
})

document.body.addEventListener('mouseup', () => {
  isDragging = false
})

// 清理
window.addEventListener('beforeunload', () => {
  uIOhook.stop()
})
