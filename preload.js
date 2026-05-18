const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    // 保存数据
    saveData: (data) => ipcRenderer.invoke('save-data', data),
    
    // 加载数据
    loadData: () => ipcRenderer.invoke('load-data'),
    
    // 导出数据
    exportData: (data) => ipcRenderer.invoke('export-data', data),
    
    // 导入数据
    importData: () => ipcRenderer.invoke('import-data'),
});
