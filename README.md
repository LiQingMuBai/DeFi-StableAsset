
- Orchestrator:[0xe1247c5dc23784a1b81ef97f0193eb7b6e37c983](https://ropsten.etherscan.io/address/0xe1247c5dc23784a1b81ef97f0193eb7b6e37c983)
- DoubleHelixPolicy: [0x57736b35919fa2d03e930e899e81dfd8409aa932](https://ropsten.etherscan.io/address/0x57736b35919fa2d03e930e899e81dfd8409aa932) 
- DoubleHelix: [0xa5b6f25f3ccfb15972add1478ee8a897eba3c806](https://ropsten.etherscan.io/address/0xa5b6f25f3ccfb15972add1478ee8a897eba3c806)
- Market Oracle: [0x99c9775e076fdf99388c029550155032ba2d8914](https://etherscan.io/address/0x99c9775e076fdf99388c029550155032ba2d8914)
- CPI Oracle: [0xa759f960dd59a1ad32c995ecabe802a0c35f244f](https://etherscan.io/address/0xa759f960dd59a1ad32c995ecabe802a0c35f244f)


## Table of Contents

- [DoubleHelix](#doublehelix)
  - [测试地址](#测试地址)
  - [DoubleHelix代币 DHX](#doublehelix代币-dhx)
  - [规则](#规则)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Testing](#testing)
  - [Contribute](#contribute)
  - [License](#license)


## Install

```bash
# Install project dependencies
npm install

# Install ethereum local blockchain(s) and associated dependencies
npx setup-local-chains
```

## Testing

``` bash
# You can use the following command to start a local blockchain instance
npx start-chain [ganacheUnitTest|gethUnitTest]

# Run all unit tests
npm test

# Run unit tests in isolation
npx truffle --network ganacheUnitTest test test/unit/DoubleHelix.js
```

## Contribute

To report bugs within this package, please create an issue in this repository.
When submitting code ensure that it is free of lint errors and has 100% test coverage.

``` bash
# Lint code
npm run lint

# View code coverage
npm run coverage
```
