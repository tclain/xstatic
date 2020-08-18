import { MachineSpec, MachineEvent, Interpreter, Machine, MachineEventHandler, MachineState, MachineTransitionHandler, Action, TransitionsOf } from "./types";
export declare class DefaultInterpreter<Spec extends MachineSpec> implements Interpreter<Spec> {
    config: Machine<Spec>;
    /** the current state of all the states of the machine */
    state: MachineState<Spec>;
    /**
     * the list of handlers to execute when a new event hits the machine
     */
    private onEventHandlers;
    /**
     * the list of handlers to execute when a new transition is the performed in the machine
     */
    private onTransitionHandlers;
    private started;
    constructor(config: Machine<Spec>);
    /** the machine listen to events */
    start(): this;
    /** the machine stops listening to events */
    stop(): this;
    /** register a middleware to produce side effects on event */
    onEvent(handler: MachineEventHandler<Spec>): this;
    /** register a middleware to produce side effects on a successful transition */
    onTransition(handler: MachineTransitionHandler<Spec>): this;
    /** send a new event in the system */
    send(event: MachineEvent<Spec>): MachineState<Spec>;
}
export declare const createMachine: <Spec extends MachineSpec>(config: Machine<Spec>) => Interpreter<Spec>;
export declare type NewContext<Spec extends MachineSpec> = {
    [Key in keyof Spec["context"]]?: (context: MachineSpec, event: MachineEvent<Spec>) => Spec["context"][Key];
};
export declare const assign: <Spec extends MachineSpec>(assigners: NewContext<Spec>) => Action<Spec>;
export declare const send: <Spec extends MachineSpec>(event: TransitionsOf<MachineSpec>, { delay, to }?: {
    delay?: number;
    to?: string;
}) => Action<Spec>;
