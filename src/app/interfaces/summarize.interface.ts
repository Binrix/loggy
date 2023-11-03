export interface Summarize {
    endOfBeginningIndex: number;
    beginningOfEndIndex: number;
    content: Content[];
}

interface Content {
    sentence: Word[];
    initiator: string;
}

interface Word {
    text: string;
    color: string;
}