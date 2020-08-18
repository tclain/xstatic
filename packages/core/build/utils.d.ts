import { MachineSpec, TransitionsOf, AssignEffect, SendEffect } from "./types";
export declare const mapValues: <Obj extends {}>(object: Obj, fn: <Key extends keyof Obj>(value: Obj[Key], key: Key) => any) => Obj;
export declare const buildAssignAction: <Spec extends MachineSpec>(context: Spec["context"]) => AssignEffect<Spec>;
export declare const buildSendAction: <Spec extends MachineSpec>(transition: import("./types").UnionOfValues<Spec["transitions"]>, opts: {
    to: string;
    delay: number;
}) => SendEffect<Spec>;
