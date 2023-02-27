import { Component, OnInit } from '@angular/core';
import { CustomFile } from '../interfaces/custom-file.interface';
import { ElectronService } from '../electron.service';
import { IpcRenderer } from '../interfaces/ipc-renderer.interface';
import { Summarize } from '../interfaces/summarize.interface';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  private renderer: IpcRenderer;
  private currentAnalyzedFolder = "";

  public error = "";
  public files: CustomFile[] = [];
  public analyzeResults: Summarize[];
  
  public filesFoundText = "0 file(s) have been found";
  public showFileContent = false;

  constructor(private es: ElectronService) { }

  public closeDetailedView(close: boolean) {
    this.showFileContent = close;
  }

  public startAnalyze(file: CustomFile): void {
    this.renderer.analyzeFile(file).then((analyzeResults) => {
      this.analyzeResults = analyzeResults;

      console.log(analyzeResults);

      this.showFileContent = true;
    });
  }

  public getFilesInFolder(pathToFolder: string): void {
    this.currentAnalyzedFolder = pathToFolder;

    this.renderer.sendFolderPath(pathToFolder).then((files: CustomFile[]) => {
      this.files = files;
      console.log(this.files);
      this.filesFoundText = `${this.files.length} file(s) have been found`;
    });
  }

  ngOnInit(): void {
    this.renderer = this.es.getRenderer();
    this.renderer.onError((errorMessage: string) => {
      this.error = errorMessage;
    });
  }
}
