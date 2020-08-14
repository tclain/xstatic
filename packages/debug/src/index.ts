import {} from "@xstatic/core";

export abstract class State {
  constructor(public id: string) {}

  abstract getChildStates(): string[];
  abstract getOutbundTransitions(): string[];
}

export type XstaticConfig = any;

export const getGraphRepresentation = (config: XstaticConfig) => {};
