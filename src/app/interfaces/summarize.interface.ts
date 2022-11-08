export interface Summarize {
    endOfBeginningIndex: number;
    beginningOfEndIndex: number;
    content: (RegExpExecArray | string)[];
}