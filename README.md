# the lightweight statechart implementation for 80% of your needs

`xstatic` is the lightweight statechart implementation for your modest apps, fully compatible with `xstate`. Think of it the preact of statecharts: API compatible but very slim and lightweight

## Goals and scope

`xstatic` implements a subset of `xstate` features that match common needs in web application development. The goal is to be slim (under 5kb w/o gzip), well tested (100% coverage) and without external dependencies.

`xstate` is wonderful and very flexible but it's easy to be lost in all the different ways to do things.

`xstatic` gathers the best practices and reduces your cognitive load while migrating your business logic to statecharts.

If you feel outgrown at a certain point, just migrate to `xstate` easily!

All kudos to @davidkpiano for its awesome work and dedication to make statecharts mainstream.

## Docs

Please consult the appropriate docs from the packages of the xstatic ecosystem:

- [xstatic/core](./packages/core/README.md)
- [xstatic/debug](./packages/debug/README.md)
- [xstatic/test](./packages/test/README.md)
- [xstatic/react](./packages/core/README.md)

## Main differences from xstate

Enjoy a subset of the same API than xstate.

Here an overview of the differences between the two:

- actions, entry/leave actions, machines, guards must be specified by names. We want to decouple as much as possible the declaration from the implementation.
- when there is the choice in xstate to choose between a string or an array of string, the array of strings will be used
