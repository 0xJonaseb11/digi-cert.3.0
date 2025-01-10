require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    defaultNetwork: 'shapeSepolia',
    networks: {
      hardhat: {
        chainId: 31337,
        url: "http://127.0.0.1:8545",  
        accounts: [`0x${process.env.PRIVATE_KEY_HARDHAT}`]
      },
      shapeSepolia: {
        chainId: 84532,
        url: process.env.SHAPE_SEPOLIA_RPC_URL,
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },

    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  customChains: [
    {
    network: "hardhat",
    chainId: 31337,
    urls: {
      apiURL: process.env.SHAPE_SEPOLIA_RPC_UR,
      browserURL: "https://shape.network"
    }
    }
  ]
};