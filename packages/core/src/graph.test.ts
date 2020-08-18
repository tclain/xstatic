import { Machine } from "./types";
import { enumerateAllNodes } from "./graph";

describe("graph/enumerateAllNodes", () => {
  it("should add the id of the machine as the root path", () => {
    expect(enumerateAllNodes({ id: "root" })).toEqual([
      ["root", { id: "root" }],
    ]);
  });

  it("should add the immediate children as root.stateName paths", () => {
    expect(
      enumerateAllNodes({ id: "root", states: { stateA: {}, stateB: {} } })
    ).toEqual([
      ["root", { id: "root", states: { stateA: {}, stateB: {} } }],
      ["root.stateA", {}],
      ["root.stateB", {}],
    ]);
  });

  it("should get all the children path recursively", () => {
    expect(
      enumerateAllNodes({
        id: "root",
        states: {
          stateA: {
            states: { c: {}, d: {} },
          },
          stateB: {
            states: {
              e: {},
              f: {},
            },
          },
          stateC: {},
        },
      })
    ).toEqual([
      [
        "root",
        {
          id: "root",
          states: {
            stateA: { states: { c: {}, d: {} } },
            stateB: { states: { e: {}, f: {} } },
            stateC: {},
          },
        },
      ],
      ["root.stateA", { states: { c: {}, d: {} } }],
      ["root.stateA.c", {}],
      ["root.stateA.d", {}],
      ["root.stateB", { states: { e: {}, f: {} } }],
      ["root.stateB.e", {}],
      ["root.stateB.f", {}],
      ["root.stateC", {}],
    ]);
  });
});
