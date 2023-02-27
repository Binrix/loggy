import { AnalyzeResult } from "../classes/analyze-result";
import { CustomFile } from "../classes/custom-file";

export interface IAnalyzer {
    /**
     * Goes through all the files in the folder and
     * saves the name and creation date in an array.
     * 
     * @param path Path to the folder with the log files
     * @returns The array with the files.
     */
    analyzeFolder(path?: string): CustomFile[];

    analyzeFile(file: CustomFile);
}