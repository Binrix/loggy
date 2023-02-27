// Imports
import { Analyzer } from "./classes/analyzer";

const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");

// Init
const analyzer = new Analyzer();

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), '/electron', 'preload.js')
        }
    });

    mainWindow.loadURL(
    url.format({
        pathname: path.join(app.getAppPath(), `/dist/loggy/index.html`),
        protocol: "file:",
        slashes: true
    })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
    mainWindow = null
    });
}

app.on('ready', createWindow);

// Handles
ipcMain.handle("onAnalyzeFile", (event, file) => {
    try {
        const result = analyzer.analyzeFile(file);
        return result;
    } catch (error) {
        event.sender.send('error', error);
        return [];
    }
});

ipcMain.handle('onGetFilesInFolder', (event, folderPath) => {
    try {
        const result = analyzer.analyzeFolder(folderPath);
        return result;
    } catch (error) {
        event.sender.send('error', error);
        return [];
    }
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})