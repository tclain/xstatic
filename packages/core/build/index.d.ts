export declare type Machine = {
    states: {};
};
export declare const createMachine: () => void;
export interface Interpreter {
}
export declare const interpret: (machine: Machine) => Interpreter;
