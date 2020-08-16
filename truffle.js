// const connectionConfig = require('frg-ethereum-runners/config/network_config.json');
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "grain ability become august evil rather ten dream knee crash space still";

var mnemonic2 = "raw topic physical globe audit girl person improve volume venue cloth zero";

module.exports = {
  // contracts_build_directory: "./build",
  networks: {
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/899f84a9e7634515b3b74e5729f47bf9"),
      network_id: 1,
      gas: 3012388,
      gasPrice: 30000000000
    },
    main: {
      provider: new HDWalletProvider(mnemonic2, "https://mainnet.infura.io/v3/899f84a9e7634515b3b74e5729f47bf9"),
      network_id: 1,
      gas: 6012388,
      gasPrice: 30000000000
    }
  //   ganacheUnitTest: connectionConfig.ganacheUnitTest,
  //   gethUnitTest: connectionConfig.gethUnitTest,
  //   testrpcCoverage: connectionConfig.testrpcCoverage
  },
  compilers: {
    solc: {
      version: '0.4.24',
      settings: {
        optimizer: {
          enabled: false
        }
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
