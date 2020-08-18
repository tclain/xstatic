import { MachineSpec, TransitionsOf, AssignEffect, SendEffect } from "./types";

export const mapValues = <Obj extends {}>(
  object: Obj,
  fn: <Key extends keyof Obj>(value: Obj[Key], key: Key) => any
): Obj => {
  return Object.keys(object).reduce((newObject, key) => {
    return { ...newObject, [key]: fn(object[key], key as keyof Obj) };
  }, {} as Obj);
};

export const buildAssignAction = <Spec extends MachineSpec>(
  context: Spec["context"]
): AssignEffect<Spec> => {
  return {
    newContext: context,
    type: "assign",
  };
};

export const buildSendAction = <Spec extends MachineSpec>(
  transition: TransitionsOf<Spec>,
  // TODO: extract type
  opts: { to: string; delay: number }
): SendEffect<Spec> => {
  return {
    type: "send",
    transition,
    to: opts.to,
    delay: opts.delay,
  };
};
