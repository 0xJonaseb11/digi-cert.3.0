require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan")

require("@nomicfoundation/hardhat-ethers")
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      chainId: 11155111,
      url: `${process.env.ETHEREUM_SEPOLIA_RPC_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]

    },
    hardhat: {},
    shapeSepolia: {
      chainId: 11011,
      url: `${process.env.SHAPE_SEPOLIA_RPC_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },


  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },

  etherscan: {

    apiKey: {
      shapeSepolia: `${process.env.ETHERSCAN_API_KEY}`
    }, 
  },
  customChains: [
    {
    network: "shapeSepolia",
    chainId: 11011,
    urls: {
      apiURL: "https://sepolia.shape.network",
      browserURL: "https://explorer-sepolia.shape.network",
     },
    }
  ]
};