# dorders

[![Integration](https://github.com/tmorin/dorders/workflows/Integration/badge.svg?branch=master)](https://github.com/tmorin/dorders/actions?query=workflow%3AIntegration+branch%3Amaster)

> A system helping two parties to exchange remotely information to fulfilled local deals.

## Abstract

`dorders` is a virtual platform helping people to exchange locally goods and services.
Its purpose is to help little and local economic agents to practice their activities without dependencies on bigger ones.
The platform relies mostly on Internet embracing a decentralized system as well as a peer-to-peer architecture.

To get more details reading the [white paper](paper/README.adoc).

## Source code

The source code is composed of several modules hosted in this monorepo.
The glue between them is mostly done using the services provided by [@dorders/fwk-model-core](packages/fwk-model-core).

The main programing language is TypeScript.

Implementation of some framework's artifacts:

- [@dorders/infra-bus-local](packages/fwk-infra-bus-local)
- [@dorders/infra-config-inmemory](packages/infra-config-inmemory)
- [@dorders/infra-logger-console](packages/infra-logger-console)

Implementation of the `dorders`'s model:

- [@dorders/model-peer](packages/model-peer)
- [@dorders/model-profile](packages/model-profile)
- [@dorders/model-contact](packages/model-contact)

Implementation of test suites validating the implementations of the `dorders`'s model.  

- [@dorders/validator-peer](packages/validator-peer)
- [@dorders/validator-profile](packages/validator-profile)
- [@dorders/validator-contact](packages/validator-contact)

Implementation of some framework's artifacts for testing purpose:

- [@dorders/infra-test](packages/fwk-infra-test)

The in-memory implementation of the `dorders` model:

- [@dorders/impl-demo-peer](packages/impl-demo-peer)
- [@dorders/impl-demo-profile](packages/impl-demo-profile)
- [@dorders/impl-demo-contact](packages/impl-demo-contact)

## Build

The main build tool is [lerna](https://lerna.js.org).

### Build and test the `dorders` modules.

```shell script
npm ci
npm run bootstrap
npm run build
npm run jest
```

### Build the white paper

```shell script
npm run paper:build
```
