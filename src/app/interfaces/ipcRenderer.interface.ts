import { AnalyzableFile } from "./file.interface";
import { Summarize } from "./summarize.interface";

export interface IpcRenderer {
    sendFolderPath(folderName: string): Promise<AnalyzableFile[]>;
    analyzeFile(fileName: string): Promise<Summarize>;
    receiveErrorMessage(): Promise<string>;
    onError(callback: (errorMessage: string) => void): void;
}