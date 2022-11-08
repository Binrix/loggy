const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const { fstat } = require('fs');
const fs = require('fs');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname, `/dist/loggy/index.html`),
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

app.on('ready', createWindow)

ipcMain.handle("onAnalyzeFile", (event, path) => {
    let summarize = {
        endOfBeginningIndex: 0,
        beginningOfEndIndex: 0,
        content: []
    };

    let regex = new RegExp(/^(?:(\[(?<time>[0-9\.:\-]{20,30})\])(\[[\s\d]{0,}\]))?(?<category>Log[A-Z]{1}[A-Za-z]+)(?::\s)(?<text>.*)$/);

    let gameClassRegex = new RegExp(/^(?:Game class is) '(?<gamemode>[a-zA-Z_]+)'$/);
    let gameInitRegex = new RegExp(/.*Engine(?: is)? [Ii]nitialized.*/);
    let gameShutdownRegex = new RegExp(/^(Game engine shut down)$/);

    let data = fs.readFileSync(path, { encoding: 'utf8' });

    data = data.replaceAll("\r", "").split("\n");

    for(let i = 0; i < data.length; i++) {
        let result = regex.exec(data[i]);

        if(result != null) {
            if(gameInitRegex.test(result.groups["text"])) {
                summarize.endOfBeginningIndex = i;
            } else if(gameShutdownRegex.test(result.groups["text"])) {
                summarize.beginningOfEndIndex = i;
            }

            summarize.content.push(result);
        } else {
            summarize.content.push(data[i]);
        }
    }

    return summarize;
});

ipcMain.handle('onGetFilesInFolder', (event, folderPath) => {
    let fileNames = [];

    try {
        fileNames = fs.readdirSync(folderPath);
    } catch (error) {
        event.sender.send('error', 'No such file or directory');
        return [];
    }

    let fileObjects = [];

    fileNames.forEach(fileName => {
        let fileObject = { name: fileName, dateTime: fs.statSync(`${folderPath}/${fileName}`).ctime.getTime() };
        fileObjects.push(fileObject);
    });

    fileObjects.sort((a, b) => a.dateTime - b.dateTime);

    return fileObjects;
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})