# DoubleHelix

[![Build Status](https://travis-ci.com/DoubleHelix/DoubleHelix.svg?token=xxNsLhLrTiyG3pc78i5v&branch=master)](https://travis-ci.com/DoubleHelix/DoubleHelix)&nbsp;&nbsp;[![Coverage Status](https://coveralls.io/repos/github/frgprotocol/DoubleHelix/badge.svg?branch=master&t=GiWi8p)](https://coveralls.io/github/frgprotocol/DoubleHelix?branch=master)

DoubleHelix (code name DoubleHelix) is a decentralized elastic supply protocol. It maintains a stable unit price by adjusting supply directly to and from wallet holders. You can read the [whitepaper](https://www.DoubleHelix.org/paper/) for the motivation and a complete description of the protocol.

This repository is a collection of [smart contracts](http://DoubleHelix.org/docs) that implement the DoubleHelix protocol on the Ethereum blockchain.

The official contract addresses are:
- ERC-20 Token: [0xD46bA6D942050d489DBd938a2C909A5d5039A161](https://etherscan.io/token/0xd46ba6d942050d489dbd938a2c909a5d5039a161)
- Supply Policy: [0x1B228a749077b8e307C5856cE62Ef35d96Dca2ea](https://etherscan.io/address/0x1b228a749077b8e307c5856ce62ef35d96dca2ea#contracts)
- Market Oracle: [0x99c9775e076fdf99388c029550155032ba2d8914](https://etherscan.io/address/0x99c9775e076fdf99388c029550155032ba2d8914)
- CPI Oracle: [0xa759f960dd59a1ad32c995ecabe802a0c35f244f](https://etherscan.io/address/0xa759f960dd59a1ad32c995ecabe802a0c35f244f)


## 测试地址
## DoubleHelix代币 DHX
- Orchestrator:[0xe1247c5dc23784a1b81ef97f0193eb7b6e37c983](https://ropsten.etherscan.io/address/0xe1247c5dc23784a1b81ef97f0193eb7b6e37c983)
- DoubleHelixPolicy: [0x57736b35919fa2d03e930e899e81dfd8409aa932](https://ropsten.etherscan.io/address/0x57736b35919fa2d03e930e899e81dfd8409aa932) 
- DoubleHelix: [0xa5b6f25f3ccfb15972add1478ee8a897eba3c806](https://ropsten.etherscan.io/address/0xa5b6f25f3ccfb15972add1478ee8a897eba3c806)
- Market Oracle: [0x99c9775e076fdf99388c029550155032ba2d8914](https://etherscan.io/address/0x99c9775e076fdf99388c029550155032ba2d8914)
- CPI Oracle: [0xa759f960dd59a1ad32c995ecabe802a0c35f244f](https://etherscan.io/address/0xa759f960dd59a1ad32c995ecabe802a0c35f244f)


## 规则
- 1号合约地址：100万  占比20%  区块浏览器标签（创世团队）
注：两年后每月释放5%，20个月释放完。
收币地址：0xB359eDB95cef97e5862E0899aE52be8e96E36cee
- 2号合约地址：60万   占比12%  区块浏览器标签（投资机构）
注：两年后每月释放5%，20个月释放完。
收币地址：0xDD6E4E63d71be7c238Cd408F2BFa4Bf6EF3b1d4D
- 3号合约地址：50万  占比10% 区块浏览器标签（技术开发者）
注：半年后每月释放10%，10个月释放完。
收币地址：0x9D58fDf0849Ad62226eD7D468606e39Dae1f3Bb0
- 4号流通地址：290万 占比58%
收币地址：0x80c0B47D196F57d8A60B94b835007AECc0BE8Ece

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

## License

[GNU General Public License v3.0 (c) 2018 Fragments, Inc.](./LICENSE)
