export declare abstract class State {
    id: string;
    constructor(id: string);
    abstract getChildStates(): string[];
    abstract getOutbundTransitions(): string[];
}
export declare type XstaticConfig = any;
export declare const getGraphRepresentation: (config: XstaticConfig) => void;
