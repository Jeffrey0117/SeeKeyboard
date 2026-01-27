// 創建一個簡單的托盤圖示
const fs = require('fs')

// 16x16 灰色背景配白色 K 字的 PNG (Base64)
const iconBase64 = `
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABHSURBV
DiNY2AYBaNgFIwCmgMmBroB/xlIBP8Z/jOQ6QKYAf+JdAHMBf8JhAMDA8wF/4cNGDCXkAMGzAX/CY
XDxgWjYBSQCgBvNwsTXJe1GQAAAABJRU5ErkJggg==
`.replace(/\s/g, '')

const iconBuffer = Buffer.from(iconBase64, 'base64')
fs.writeFileSync('icon.png', iconBuffer)

console.log('✅ icon.png 已創建')
