# SeeKeyboard

<div align="center">
  <img src="logo.png" alt="SeeKeyboard Logo" width="500">
</div>

🎹 即時顯示鍵盤按鍵的小工具，適合教學錄影與演示快捷鍵

![License](https://img.shields.io/github/license/Jeffrey0117/SeeKeyboard)
![Version](https://img.shields.io/github/package-json/v/Jeffrey0117/SeeKeyboard)

## ✨ 功能特色

- **即時顯示** - 按下按鍵立即顯示，支援組合鍵（Ctrl + Shift + A）
- **可自訂** - 調整顯示時長、字體大小、按鍵樣式
- **顯示過濾** - 可設定只在使用功能鍵時顯示
- **拖曳移動** - 點擊按鍵區域可拖曳調整位置，自動記住
- **系統托盤** - 右鍵托盤圖示快速開啟設定

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動應用

```bash
npm start
```

### 開啟設定

在系統托盤找到藍色圖示，點擊或右鍵選擇「設定」

## ⚙️ 設定選項

- **顯示時長** - 調整按鍵顯示多久後淡出（0.5-3 秒）
- **淡出速度** - 調整淡出動畫速度
- **按鍵大小** - 小/中/大
- **字體大小** - 12-24px
- **顯示過濾**
  - 只在有功能鍵時顯示（Ctrl/Alt/Shift/Win）
  - 顯示單獨功能鍵
  - 顯示字母/數字鍵

## 📝 已知問題

查看 [Issues](https://github.com/Jeffrey0117/SeeKeyboard/issues) 了解當前已知問題

## 🛠️ 技術棧

- Electron
- uiohook-napi
- electron-store

## 📄 授權

MIT License
