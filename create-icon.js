// 根據 logo.png 創建 32x32 的 icon.png（用於系統托盤）
const sharp = require('sharp')
const path = require('path')

async function createIcon() {
  const logoPath = path.join(__dirname, 'logo.png')
  const iconPath = path.join(__dirname, 'icon.png')

  await sharp(logoPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(iconPath)

  console.log('icon.png 已根據 logo.png 建立（32x32）')
}

createIcon().catch((error) => {
  console.error('建立 icon.png 失敗:', error.message)
  process.exit(1)
})
