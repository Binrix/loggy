import { readdirSync, statSync, readFileSync } from "fs";
import { CustomFile } from "./custom-file";
import { IAnalyzer } from "../interfaces/analyzer.interface";
import { AnalyzeResult } from "./analyze-result";

/**
 * The class for handling the analyze of the folders
 * and reading the content of the files. Saves the last 
 * files from the previous analyze for adding related files.
 */
export class Analyzer implements IAnalyzer {
    /**
     * The files from the last analyze.
     */
    private lastFiles: CustomFile[] = []; 

    public analyzeFolder(path?: string): CustomFile[] {
        try {
            if( path == undefined  || path.length <= 0) { return []; } 

            let fileNames = readdirSync(path);
            let files = this.getFilesFromFolder(fileNames, path);

            return files;
        } catch (error) {
            console.error(error);
        }
    }

    private relatedFiles() {

    }

    public analyzeFile(file: CustomFile): AnalyzeResult[] {
        try {
            let regex = new RegExp(/^(?:(\[(?<time>[0-9\.:\-]{20,30})\])(\[[\s\d]{0,}\]))?(?<category>Log[A-Z]{1}[A-Za-z]+)(?::\s)(?<text>.*)$/);

            let gameClassRegex = new RegExp(/^(?:Game class is) '(?<gamemode>[a-zA-Z_]+)'$/);
            let gameInitRegex = new RegExp(/.*Engine(?: is)? [Ii]nitialized.*/);
            let gameShutdownRegex = new RegExp(/^(Game engine shut down)$/);

            let summarizes: AnalyzeResult[] = [];

            file.names.forEach(fileName => {
                try {
                    let summarize = new AnalyzeResult();
                    let fileData = readFileSync(`${file.path}/${fileName}`, { encoding: 'utf-8' });
                    let dataFormatted = fileData.replaceAll("\r", "").split("\n");
    
                    for(let i = 0; i < dataFormatted.length; i++) {
                        let regexData = regex.exec(dataFormatted[i]);

                        if(regexData != null) {
                            // this.getStartAndEndIndex(regexData, summarize, i);

                            if(gameInitRegex.test(regexData.groups["text"])) {
                                summarize.startIndex = i;
                            } else if(gameShutdownRegex.test(regexData.groups["text"])) {
                                summarize.endIndex = i;
                            }

                            summarize.content.push(regexData);
                        } else {
                            summarize.content.push(dataFormatted[i]);
                        }
                    }

                    summarizes.push(summarize);
                } catch (error) {
                    console.error(error);
                }
            });

            return summarizes;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Gets the start index and end index of the 
     * interesting part of the logs.
     * @param data The data from the regex
     * @param summarize The object that holds the start and end index
     * @param index The index of the current row in the logs
     * @returns Nothing
     */
    private getStartAndEndIndex(data: RegExpExecArray, summarize: AnalyzeResult, index: number): void {
        

        
    }

    /**
     * Iterates through the file names and collects the data of 
     * the file.
     * @param fileNames The names of the files
     * @returns An array of custom files
     */
    private getFilesFromFolder(fileNames: string[], path: string): CustomFile[] {
        let files: CustomFile[] = [];

        fileNames.forEach(fileName => {
            let modifiedDate = statSync(`${path}/${fileName}`).mtime;

            let relatedFile = files.find(f => Math.abs((f.modifiedDate.getTime() - modifiedDate.getTime())) < (1000*10) )

            if(relatedFile != undefined) {
                relatedFile.names.push(fileName);
            } else {
                let file = new CustomFile(modifiedDate, path);
                file.names.push(fileName);

                files.push(file);                
            }
        });

        files.sort((a, b) => a.modifiedDate.getTime() - b.modifiedDate.getTime());
        // lastFiles = files;

        return files;
    }

}