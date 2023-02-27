import { CustomFile } from "./custom-file.interface";
import { Summarize } from "./summarize.interface";

export interface IpcRenderer {
    sendFolderPath(folderName: string): Promise<CustomFile[]>;
    analyzeFile(file: CustomFile): Promise<Summarize[]>;
    receiveErrorMessage(): Promise<string>;
    onError(callback: (errorMessage: string) => void): void;
}