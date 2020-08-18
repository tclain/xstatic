// common types utils

export type Satisfy<Base, Implementation extends Base> = Implementation;
export type UnionOfValues<Obj extends {}> = Obj[keyof Obj];
export type IndexableKey = string | number | symbol;
export type Optional<Type> = Type | undefined;

/** This is the base type to comply to while creating machine description */

export type AbstractStateTree = {
  [key: string]: never | AbstractStateTree;
};

export type MachineSpec = {
  id: string;
  context?: any;
  transitions?: {
    [key: string]: never | string;
  };
  state: AbstractStateTree;
  actions?: string;
  guards?: string;
};

export type StatesOf<Spec extends MachineSpec> = keyof Spec["transitions"];
export type TransitionsOf<Spec extends MachineSpec> = UnionOfValues<
  Spec["transitions"]
>;
export type ActionsOf<Spec extends MachineSpec> = keyof Spec["actions"];
export type GuardsOf<Spec extends MachineSpec> = keyof Spec["guards"];

export type Hooks<Spec extends MachineSpec> = {
  entry?: ActionsOf<Spec>[];
  exit?: ActionsOf<Spec>[];
};

export type State<Spec extends MachineSpec> = {
  // @xstate-discrepancies
  id?: string;
  initial?: StatesOf<Spec>;
  context?: Spec["context"];
  states?: {
    [StateName in StatesOf<Spec>]: State<Spec>;
  };
  // @xstate-discrepancies
  on?: {
    [Transitions in TransitionsOf<Spec>]: {
      target: StatesOf<Spec>;
      cond?: GuardsOf<Spec>[];
    } & Hooks<Spec>;
  };
} & Hooks<Spec>;

export type Machine<Spec extends MachineSpec> = {
  [Key in keyof State<Spec>]: Key extends "id" | "initial" | "states"
    ? State<Spec>[Key]
    : Optional<State<Spec>[Key]>;
};

export type MachineEvent<Spec extends MachineSpec, Payload = any> = {
  type: TransitionsOf<Spec>;
  payload: Payload;
};

export type MachineState<Spec extends MachineSpec> = Spec["state"];

export type MachineStateChange<Spec extends MachineSpec> = {
  previous: MachineState<Spec>;
  next: MachineState<Spec>;
};

// instance

export type MachineEventHandler<Spec extends MachineSpec> = (
  event: MachineEvent<Spec>
) => void;

export type MachineTransitionHandler<Spec extends MachineSpec> = (
  originEvent: MachineEvent<Spec>,
  transition: TransitionsOf<Spec>,
  beforeAfter: MachineStateChange<Spec>
) => void;

export interface Interpreter<Spec extends MachineSpec> {
  state: MachineState<Spec>;
  onEvent(handler: MachineEventHandler<Spec>): Interpreter<Spec>;
  onTransition(handler: MachineTransitionHandler<Spec>): Interpreter<Spec>;
  start(): Interpreter<Spec>;
  stop(): Interpreter<Spec>;
  send(event: MachineEvent<Spec>): MachineState<Spec>;
}

// @xstate-diff only support one assign form
export type AssignEffect<Spec extends MachineSpec> = {
  type: "assign";
  newContext: Spec["context"];
};

export type SendEffect<Spec extends MachineSpec> = {
  type: "send";
  transition: TransitionsOf<Spec>;
  to: "self" | string;
  // TODO
  delay: number;
};

//
// TODO: Forward, Log, Choose, pure
export type SideEffect<Spec extends MachineSpec> =
  | AssignEffect<Spec>
  | SendEffect<Spec>;

export type Action<Spec extends MachineSpec> = (
  context: Spec["context"],
  event: MachineEvent<Spec>,
  from?: string
) => SideEffect<Spec> | undefined;

export type Guard<Spec extends MachineSpec> = (
  context: Spec["context"],
  event?: MachineEvent<Spec>
) => boolean;

export type ConcreteBehaviours<Spec extends MachineSpec> = {
  actions: {
    [key in ActionsOf<Spec>]: Action<Spec>;
  };
  guards: {
    [key in GuardsOf<Spec>]: Guard<Spec>;
  };
  // TODO: services
};
