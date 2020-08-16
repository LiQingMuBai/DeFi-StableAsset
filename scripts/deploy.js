const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '/Users/sherlock/source/blockchain/uFragments/build/UFragments.json');
const { interface, bytecode } = require(contractPath);

// 2. 配置 provider
const provider = new HDWalletProvider(
    'grain ability become august evil rather ten dream knee crash space still',
    'https://ropsten.infura.io/v3/899f84a9e7634515b3b74e5729f47bf9'
);

const fs = require('fs');
const compiledFactory = require('/Users/sherlock/source/blockchain/uFragments/build/UFragments.json');

//const compiledFactory = require('/Users/sherlock/source/blockchain/uFragments/build/UFragments.json');

// 3. 初始化 web3 实例
const web3 = new Web3(provider);

(async () => {
    // 4. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约的账户：', accounts[0]);

    // 5. 创建合约实例并且部署
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    console.log('合约部署成功：', result);
})();