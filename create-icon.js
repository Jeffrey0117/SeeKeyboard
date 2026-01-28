// 根據 logo.png 創建 icon.png
const fs = require('fs');

try {
  const logoBuffer = fs.readFileSync('logo.png');
  fs.writeFileSync('icon.png', logoBuffer);
  console.log('✅ icon.png 已根據 logo.png 更新');
} catch (error) {
  console.error('❌ 創建 icon.png 失敗:', error.message);
}
