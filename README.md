<<<<<<< HEAD
# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
=======
# digital_certification.3.0
(A Digital certification platform for Enterprises)

## TASKS

- INITIAL implemenation on Ethereum blockchain with Solidity
- FINAL Implementation on Hyperledger Fabric 

## About

Digital_Certification is a decentralized Certification system that helps to certify Enterprises for eligibility on their services they provide!!
## Table of Contents
[About](#about)
- [Problem Statement](#problem-statement)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
  - [For Patients](#for-patients)
  - [For Doctors](#for-doctors)
- [Smart Contracts Overview](#-smart-contracts-overview)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Future Work](#future-work)

## Problem Statement



## Features



## Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **Backend**: Solidity smart contracts deployed on Shape Network - A Layer 2 Blockchain for creators
- **Blockchain Framework**: Scaffold-ETH for quick and efficient development and deployment
- **Wallet Integration**: MetaMask, WalletConnect via `wagmi`
- **Deployment**: Vercel for hosting

## Getting Started

To get up and running with Digital_Certification, follow these steps:

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MetaMask](https://metamask.io/) or any Web3 wallet
- [Vercel CLI](https://vercel.com/docs/cli) (for deployment)

### Installation

<!-- 1. **Clone the Repository**:
```sh
git clone https://github.com/0xJonaseb11/digital_certification.3.0.git
cd MedLedger
# Install dependencies
yarn install
#Start the Blockchain Network:

yarn chain
yarn deploy
# Run the Development Server:
yarn dev

```
**After the server is up and running, open your browser and navigate to `http://localhost:3000` to interact with MedLedger.** -->

## Usage

### For Adminstrator


### For Enterprises

### Smart Contracts Overview


## Contributing

**We welcome contributions to Digital_Certification! If you want to help, follow these steps:**
1. Fork the Repository to your own GitHub account.
2. Create a Feature Branch

```sh
git checkout -b feature/your-feature
```
3. Commit Your Changes

```sh
git commit -m 'Add new feature or fix'
```
4. Push to the Feature Branch:
```sh
git push origin feature/your-feature
```
5. Open a Pull Request to the main branch of the MedLedger repository.

## License
Digital_Certification is licensed under the [MIT License](./LICENCE). Feel free to fork, modify, and contribute.

_**For more information, reach out to us at <sebejaz99@gmail.com>**_

## Acknowledgments

I want to express my sincere gratitude to the following individuals and resourceful companies for making this project possible:

[Shape Network](https://docs.shape.network/documentation) :: For prividing me more than enough knowledge to build such an amazing masterpiece being my first time to build on the network!! It really looked soo easyy!!!!

[Openzeppelin](https://www.openzeppelin.com/) :: For their robust libraries and tools that streamlined the smart contract development process.

[Scaffold-ETH2](https://scaffold-eth-2-docs.vercel.app/quick-start) :: For providing a solid foundation for building Ethereum applications quickly.

[Ethereum Organisation](https://ethereum.org/en/developers/docs/) :: For serving as a comprehensive resource for understanding Ethereum development.


_**Thank you all for your support and contributions!**_

## Future Work
As this project is in its initial stage, We plan to make it even broader than it is now since We see a potential in what it can achieve once it is taken as a serious project!!
Our team plan to introduce more scalability in the future and also bridge the gap of interoperability!!

----------------

[@0xJonaseb11](https://jonas-sebera.vercel.app)
>>>>>>> 1216ea7cb06d5560a85ad27630a37aed6610c8a1
