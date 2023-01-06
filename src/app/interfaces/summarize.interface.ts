export interface Summarize {
    startIndex: number;
    endIndex: number;
    content: (RegExpExecArray | string)[];
}