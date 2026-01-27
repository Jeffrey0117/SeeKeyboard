// 創建一個簡單的托盤圖示
const fs = require('fs')

// 16x16 藍色背景配白色 K 字的 PNG (Base64) - 更明顯
const iconBase64 = `
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAAPQAAAD0BR5V2vQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABsSURBV
DiN7ZIxDoAgEATnMAH/bPwNf2gpNlbGQqOJhYWNhbEwkbsCS0JCYWGhk0xDsXvDbYC/AfgAKIUQcg
BmZk9mHsxMzrkHQCkl7/veEkKYrbWPGGMTQpiIKBRCaGKMTQghllLq3vsrIuoBoLc9PAuNkBcAAAA
ASUVORK5CYII=
`.replace(/\s/g, '')

const iconBuffer = Buffer.from(iconBase64, 'base64')
fs.writeFileSync('icon.png', iconBuffer)

console.log('✅ icon.png 已創建（藍色背景）')
