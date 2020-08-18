import {
  MachineSpec,
  MachineEvent,
  Interpreter,
  Machine,
  MachineEventHandler,
  MachineState,
  MachineTransitionHandler,
  Action,
  TransitionsOf,
  SideEffect,
} from "./types";
import { mapValues, buildAssignAction, buildSendAction } from "./utils";

// @xstate-diff: createMachine returns a service
export class DefaultInterpreter<Spec extends MachineSpec>
  implements Interpreter<Spec> {
  /** the current state of all the states of the machine */
  public state: MachineState<Spec> = {};

  /**
   * the list of handlers to execute when a new event hits the machine
   */
  private onEventHandlers: MachineEventHandler<Spec>[] = [];

  /**
   * the list of handlers to execute when a new transition is the performed in the machine
   */
  private onTransitionHandlers: MachineTransitionHandler<Spec>[] = [];

  private started: boolean = false;

  constructor(public config: Machine<Spec>) {}

  /** the machine listen to events */
  start() {
    this.started = true;
    return this;
  }

  /** the machine stops listening to events */
  stop() {
    return this;
  }

  /** register a middleware to produce side effects on event */
  onEvent(handler: MachineEventHandler<Spec>) {
    this.onEventHandlers.push(handler);
    return this;
  }

  /** register a middleware to produce side effects on a successful transition */
  onTransition(handler: MachineTransitionHandler<Spec>) {
    this.onTransitionHandlers.push(handler);
    return this;
  }

  /** send a new event in the system */
  send(event: MachineEvent<Spec>) {
    if (!this.started) return;
    return this.state;
  }
}

export const createMachine = <Spec extends MachineSpec>(
  config: Machine<Spec>
): Interpreter<Spec> => {
  return new DefaultInterpreter(config);
};

export type NewContext<Spec extends MachineSpec> = {
  [Key in keyof Spec["context"]]?: (
    context: MachineSpec,
    event: MachineEvent<Spec>
  ) => Spec["context"][Key];
};
export const assign = <Spec extends MachineSpec>(
  assigners: NewContext<Spec>
): Action<Spec> => (ctx, event) => {
  return {
    ...ctx,
    ...mapValues(assigners, (assigner, key) => {
      const newContext = assigner(ctx, event);
      return buildAssignAction(newContext);
    }),
  };
};

// TODO: implement timing
export const send = <Spec extends MachineSpec>(
  event: TransitionsOf<MachineSpec>,
  { delay = 0, to = "self" }: { delay?: number; to?: string } = {}
): Action<Spec> => (ctx, event) => {
  return buildSendAction(event.type, { delay, to });
};
