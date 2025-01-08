require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    defaultNetwork: 'shapeSepolia',
    networks: {
      hardhat: {},
      shapeSepolia: {
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
};