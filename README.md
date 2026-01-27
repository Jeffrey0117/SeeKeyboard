# SeeKeyboard

鍵盤按鍵顯示工具，用於螢幕錄製教學和快捷鍵演示。

## 功能特性

- 即時顯示當前按下的按鍵
- 白底鍵盤樣式顯示
- 透明浮動視窗
- 可拖曳移動，自動記住位置
- 1.5 秒後自動淡出

## 使用方式

### 啟動應用

```bash
npm start
```

### 開發模式（帶 DevTools）

```bash
npm run dev
```

## 專案結構

```
vibeAHK/
├── main.js           # Electron 主程序
├── index.html        # UI 介面
├── renderer.js       # 渲染程序邏輯
├── styles.css        # 樣式
├── package.json      # 專案配置
└── SPEC.md          # 規格文檔
```

## 技術棧

- **Electron** - 桌面應用框架
- **uiohook-napi** - 全域鍵盤監聽
- **electron-store** - 本地儲存
- **@electron/remote** - 跨程序通訊

## 操作說明

1. 啟動後會顯示一個小型透明視窗
2. 按下任何按鍵會立即顯示
3. 組合鍵會橫向排列顯示（如 Ctrl + Shift + A）
4. 1.5 秒後自動淡出
5. 可以拖曳視窗到任意位置，下次啟動會記住位置
