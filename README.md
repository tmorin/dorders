# dorders

[![Integration](https://github.com/tmorin/dorders/workflows/Integration/badge.svg?branch=master)](https://github.com/tmorin/dorders/actions?query=workflow%3AIntegration+branch%3Amaster)

> A system helping two parties to exchange remotely information to fulfilled local deals.

## Abstract

`dorders` is a virtual platform helping people to exchange locally goods and services.
Its purpose is to help little and local economic agents to practice their activities without dependencies on bigger ones.
The platform relies mostly on Internet embracing a decentralized system as well as a peer-to-peer architecture.

To get more details reading the [white paper](paper/README.adoc).

## Bounded contexts

### Peer

- [peer-impl-demo](packages/peer-impl-demo)
- [peer-model](packages/peer-model)
- [peer-validator](packages/peer-validator)

### Contact

- [contact-impl-demo](packages/contact-impl-demo)
- [contact-model](packages/contact-model)
- [contact-validator](packages/contact-validator)

### Profile

- [profile-impl-demo](packages/profile-impl-demo)
- [profile-model](packages/profile-model)
- [profile-validator](packages/profile-validator)

### Framework

- [fwk-model-fs](packages/fwk-model-fs)
- [fwk-model-schema](packages/fwk-model-schema)

## Build

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
