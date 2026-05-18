# 人生 K 线 - Electron 桌面版安装指南

## 方法一：直接运行（开发模式）

### 1. 安装 Node.js
如果还没有安装 Node.js，请访问：https://nodejs.org/
建议安装 LTS（长期支持）版本

### 2. 安装依赖
打开命令行（PowerShell 或 CMD），进入项目目录：
```bash
cd C:\Users\plbxr\Desktop\test
```

安装项目依赖：
```bash
npm install
```

### 3. 运行应用
```bash
npm start
```

应用会在 Electron 窗口中打开，数据会自动保存在本地文件中。

---

##  方法二：打包成可执行文件（推荐）

### 1. 安装依赖
```bash
npm install
```

### 2. 打包应用

#### Windows 系统：
```bash
npm run build:win
```

#### macOS 系统：
```bash
npm run build:mac
```

#### Linux 系统：
```bash
npm run build:linux
```

### 3. 安装应用

打包完成后，在 `dist` 目录中会生成可执行文件：

#### Windows:
- `dist/人生 K 线 Setup x.x.x.exe` - 安装程序
- 双击运行安装程序
- 安装完成后可以在开始菜单找到"人生 K 线"

#### macOS:
- `dist/人生 K 线-x.x.x.dmg` - 安装包
- 双击 DMG 文件
- 将应用拖拽到 Applications 文件夹

#### Linux:
- `dist/人生 K 线-x.x.x.AppImage` - 便携版
- 右键文件 → 属性 → 权限 → 允许作为程序执行
- 双击运行

---

## 数据存储位置

### Electron 桌面版
数据保存在系统的应用数据目录中：

#### Windows:
```
C:\Users\你的用户名\AppData\Roaming\人生 K 线\data\life_kline_data.json
```

#### macOS:
```
~/Library/Application Support/人生 K 线/data/life_kline_data.json
```

#### Linux:
```
~/.config/人生 K 线/data/life_kline_data.json
```

### 浏览器版
数据保存在浏览器的 localStorage 中。

---

## 数据备份

### 导出备份
1. 打开应用
2. 点击"历史数据"
3. 点击"导出 JSON"
4. 选择保存位置
5. 定期备份到云盘或外部存储

### 恢复数据
1. 打开应用
2. 点击"历史数据"
3. 点击"导入数据"
4. 选择之前导出的 JSON 文件
5. 数据立即恢复

---

## 常见问题

### Q: 应用无法启动？
A: 确保已安装 Node.js，并运行 `npm install` 安装依赖。

### Q: 数据丢失了？
A: Electron 版本的数据保存在系统应用数据目录，检查该目录是否存在。

### Q: 如何更新应用？
A: 重新运行打包命令，生成新的安装包并覆盖安装。

### Q: 可以在多个设备同步数据吗？
A: 可以定期导出 JSON 文件，然后在其他设备导入。或者使用云同步工具（如 Dropbox、OneDrive）同步数据文件。

---

## 卸载

### Windows:
- 控制面板 → 程序和功能 → 找到"人生 K 线" → 卸载

### macOS:
- Applications 文件夹 → 将"人生 K 线"拖到废纸篓

### Linux:
- 删除 AppImage 文件和相关配置：
```bash
rm ~/.config/人生 K 线 -rf
```

---

## 技术支持

如有问题，请提交 Issue 或联系开发者。
