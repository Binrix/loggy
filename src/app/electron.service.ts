import { Injectable } from '@angular/core';
import { IpcRenderer } from 'src/app/interfaces/ipc-renderer.interface';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
    private ipcRenderer: IpcRenderer;

    constructor() {
        this.ipcRenderer = (<any>window).ipc as IpcRenderer;
    }

    public getRenderer(): IpcRenderer {
        return this.ipcRenderer;
    }

    // public send(channel: string, value: any) {
    //     this.ipcRenderer.send(channel, value);
    // }

    // public subscribe(channel: string, callback: Function): any {
    //     this.ipcRenderer.on(channel, callback);
    // }
}