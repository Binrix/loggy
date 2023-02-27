export class CustomFile {
    public names: string[] = [];
    public modifiedDate: Date;
    public path: string;

    public constructor(modifiedDate: Date, path: string) {
        this.modifiedDate = modifiedDate;
        this.path = path;
    }
}