// Imports
const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');

// Classes
class Error {
    constructor(message) {
        this.message = message;
        this.name = "Error";
    }
}

class AnalyzeFolderError extends Error {
    constructor(message) {
        super(message);
        this.name = "AnalyzeFolderError";
    }
}

class Analyzer {
    analyzeFolder(path) {
        console.log("analyze folder");
        try {
            console.log("path: " + path);
            let fileNames = [];
            let files = [];

            fileNames = fs.readdirSync(path);
    
            fileNames.forEach(fileName => {
                let fileObject = { name: fileName, dateTime: fs.statSync(`${path}/${fileName}`).ctime.getTime() };
                files.push(fileObject);
            });

            files.sort((a, b) => a.dateTime - b.dateTime);
            console.log("files done");
            return files;
        } catch (error) {
            throw new AnalyzeFolderError("Directory does not exist");
        }
    }
    analyzeFile(path) {
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
                var sentence = result.groups["text"];
                
                if(gameInitRegex.test(result.groups["text"])) {
                    summarize.endOfBeginningIndex = i;
                } else if(gameShutdownRegex.test(result.groups["text"])) {
                    summarize.beginningOfEndIndex = i;
                }

                var words = sentence.split(" ");
                var processedWords = [];
                for(let j = 0; j < words.length; j++) {
                    var word = words[j];
                    let color = "#212121";

                    if(processWord(word)) {
                        color = "red"; 
                    }

                    processedWords.push({
                        text: word,
                        color: color
                    });
                }

                summarize.content.push({
                    initiator: result.length >= 4 ? result[4] : "undefined",
                    sentence: processedWords,
                });
            } else {
                summarize.content.push({
                    initiator: 'undefined',
                    sentence: [{ text: 'undefined', color: '#212121' }],
                })
            }
        }
    
        console.log("summarize.content");
        console.log(summarize.content);

        return summarize;
    }
}

function processWord(word) {
    let regex = new RegExp(/\d+/g);
    return regex.test(word);
}

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
ipcMain.handle("onAnalyzeFile", (event, path) => {
    try {
        const result = analyzer.analyzeFile(path);
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