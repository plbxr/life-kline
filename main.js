const { app, BrowserWindow, ipcMain, fs, path } = require('electron');
const path = require('path');

const DATA_DIR = path.join(app.getPath('userData'), 'data');
const DATA_FILE = path.join(DATA_DIR, 'life_kline_data.json');

let mainWindow;

// 确保数据目录存在
function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ records: [], analyses: [] }, null, 2));
    }
}

// 读取数据
function loadData() {
    try {
        ensureDataDir();
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取数据失败:', error);
        return { records: [], analyses: [] };
    }
}

// 保存数据
function saveData(data) {
    try {
        ensureDataDir();
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('保存数据失败:', error);
        return false;
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: path.join(__dirname, 'icon.png'),
        title: '人生 K 线',
    });

    mainWindow.loadFile('life_kline_v2.html');

    // 开发模式下打开 DevTools
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    // 监听保存数据请求
    ipcMain.handle('save-data', (event, data) => {
        return saveData(data);
    });

    // 监听加载数据请求
    ipcMain.handle('load-data', () => {
        return loadData();
    });

    // 监听导出数据请求
    ipcMain.handle('export-data', (event, data) => {
        const { dialog } = require('electron');
        const result = dialog.showSaveDialogSync(mainWindow, {
            title: '导出数据',
            defaultPath: 'life_kline_backup.json',
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
            ],
        });

        if (result) {
            try {
                fs.writeFileSync(result, JSON.stringify(data, null, 2), 'utf-8');
                return { success: true, path: result };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
        return { success: false, error: '用户取消操作' };
    });

    // 监听导入数据请求
    ipcMain.handle('import-data', () => {
        const { dialog } = require('electron');
        const result = dialog.showOpenDialogSync(mainWindow, {
            title: '导入数据',
            filters: [
                { name: 'JSON Files', extensions: ['json'] },
            ],
            properties: ['openFile'],
        });

        if (result && result.length > 0) {
            try {
                const fileContent = fs.readFileSync(result[0], 'utf-8');
                const data = JSON.parse(fileContent);
                saveData(data);
                return { success: true, data };
            } catch (error) {
                return { success: false, error: error.message };
            }
        }
        return { success: false, error: '用户取消操作' };
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
