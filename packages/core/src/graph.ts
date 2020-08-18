/** a flattened out version of the machine config that ease access */

import { MachineSpec, StatesOf, Action, MachineState, Machine } from "./types";

type NodeTuple<Spec extends MachineSpec> = [string, Machine<Spec>];

export const hasSubstates = <Spec extends MachineSpec>(
  config: Machine<Spec>
): boolean => config.states && Object.keys(config.states).length > 0;

/** custom iterator that go through all of the graph and return a iterator of [StateName, Node] tuples  */
// TBD: optimize this walk with a rolling array containing "tagged" nodes.
export const enumerateAllNodes = <Spec extends MachineSpec>(
  node: Machine<Spec>,
  basePath: string | null = null
): Iterable<NodeTuple<Spec>> => {
  const paths: NodeTuple<Spec>[] = [];
  // the base path is either the root id of the machine or the pass thru path from previous iterations
  const rootPath = basePath === null ? node.id : basePath;
  // this path is a node as well so we save it !
  paths.push([rootPath, node]);

  // now let's iterate over children (nodes)
  const nodeHasSubstates = hasSubstates(node);

  if (nodeHasSubstates) {
    // we add the direct nodes and their children recursively
    const recursiveNodes = Object.keys(node.states).forEach((stateName) => {
      paths.push(
        ...enumerateAllNodes(node.states[stateName], `${rootPath}.${stateName}`)
      );
    });
  }

  return paths;
};

/** return the node matching a state path */
// TBD
export const resolvePath = <Spec>(
  config: Machine<any>,
  path: string
): Machine<any> => {
  return {};
};
