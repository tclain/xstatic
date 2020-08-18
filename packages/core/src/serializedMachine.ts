/** an efficient, flatten serialized version of the state chart defined max O(n) access */

import { MachineSpec, MachineState, StatesOf, Action } from "./types";

export type SerializedMachineState<Spec extends MachineSpec> = {
  context: Spec["context"];
  state: MachineState<Spec>;
  compositeStates: {
    [StateDottedPath: string]: StatesOf<Spec>;
  };
  entry: {
    [StateDottedPath: string]: Action<Spec>;
  };
  exit: {
    [StateDottedPath: string]: Action<Spec>;
  };
};

export const hasEntryAction = (
  path: string,
  machineState: SerializedMachineState<any>
) => machineState.entry[path];

export const hasExitAction = (
  path: string,
  machineState: SerializedMachineState<any>
) => machineState.entry[path];
