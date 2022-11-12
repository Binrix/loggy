import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../electron.service';
import { AnalyzableFile } from '../interfaces/file.interface';
import { IpcRenderer } from '../interfaces/ipcRenderer.interface';
import { Summarize } from '../interfaces/summarize.interface';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  private renderer: IpcRenderer;
  private currentAnalyzedFolder = "";
  
  public analyzeResult: Summarize;
  public filesFoundText = "0 file(s) have been found";
  public errorMessage = "";
  public files: AnalyzableFile[] = [];
  public showFileContent = false;

  constructor(private es: ElectronService) { }

  public closeDetailedView(close: boolean) {
    this.showFileContent = close;
  }

  public startAnalyze(fileName: string): void {
    this.renderer.analyzeFile(`${this.currentAnalyzedFolder}/${fileName}`).then((analyzeResult) => {
      // Class.toString() => class [className] {} => .split(" ") => length > 1 => typeof class == arr[1]
      this.analyzeResult = analyzeResult;
      console.log(this.analyzeResult);
      this.showFileContent = true;
    });
  }

  public getFilesInFolder(pathToFolder: string): void {
    this.currentAnalyzedFolder = pathToFolder;

    this.renderer.sendFolderPath(pathToFolder).then((files: AnalyzableFile[]) => {
      this.files = files;
      this.filesFoundText = `${this.files.length} file(s) have been found`;
    });
  }

  ngOnInit(): void {
    this.renderer = this.es.getRenderer();
    this.renderer.onError((errorMessage: string) => {
      console.log(errorMessage);
    });
  }
}
