const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("ipc", {
    sendFolderPath: (args) => ipcRenderer.invoke('onGetFilesInFolder', args),
    analyzeFile: (args) => ipcRenderer.invoke('onAnalyzeFile', args),
    onError: (callback) => ipcRenderer.on('error', (event, errorMessage) => callback(errorMessage)),
});