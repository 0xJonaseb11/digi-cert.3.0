[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity Version](https://img.shields.io/badge/Solidity-^0.8.20-blue)](https://docs.soliditylang.org)

# Digi-Cert: On-Chain Digital Certification Platform

A blockchain-based certification management system for enterprises, providing immutable credential issuance, inspection workflows, and decentralized oversight.

Digi-Cert is a blockchain-powered digital certification platform designed to ensure **trust, transparency, and integrity** in the certification of enterprises. Built on **Scaffold-ETH 2**, it combines regulatory compliance, enterprise registry, digital credentialing, and role-based access control — all on-chain.

---

## Table of Contents

- [ Features](#-features)
- [ Smart Contract Architecture](#-smart-contract-architecture)
- [ RBAC Design](#-rbac-design)
- [ Certification Process](#️-certification-process)
- [ Project Structure](#-project-structure)
- [ Tech Stack](#️-tech-stack)
- [ Testing](#-testing)
- [ License](#-license)
- [ Contact](#-contact)

---

##  Features

- **On-chain Certification Issuance** via NFTs  
- **Enterprise Registration & Deregistration**  
- **Role-Based Access Control (RBAC)** using `RolesManager`  
- **Inspections & Trust Management**  
- **Auditor Oversight & Compliance Audits**  
- **Anti-Spam Security** with audit deposit requirement  

---

## Smart Contract Architecture

```sh
packages/hardhat/contracts/
├── core/
│   ├── CertificationAuthority.sol       # Issues certificates, manages cert logic
│   └── RolesManager.sol                 # Centralized RBAC: assign, revoke, manage roles
│
├── interfaces/
│   ├── ICertificateNFT.sol
│   ├── ICertificationAuthority.sol
│   ├── IEnterpriseRegistry.sol
│   └── IInspectionManager.sol
│
├── modules/
│   ├── AuditorOversight.sol             # Audits inspection reports & ensures compliance
│   ├── CertificateNFT.sol               # NFT-based certificate logic
│   ├── EnterpriseRegistry.sol           # Registers/deregisters enterprises
│   └── InspectionManager.sol            # Validates activities & inspections
│
├── utils/
│   ├── DataTypes.sol                    # Common structs and enums
│   ├── Errors.sol                       # Custom error definitions
│   └── Events.sol                       # Shared events across contracts

```

---

## 🔐 RBAC Design

All user roles are centrally controlled via the `RolesManager` contract, including:

- **Certification Authorities**: Issue and revoke certificates  
- **Enterprises**: Registered and certified businesses  
- **Inspectors**: Conduct compliance checks  
- **Auditors**: Independently audit activities and inspection reports  

---

## 🎖️ Certification Process

1. **Enterprise Registration** via `EnterpriseRegistry`  
2. **Inspections** carried out via `InspectionManager`  
3. **Audits** by neutral third parties via `AuditorOversight`  
   - Minimum 0.1 ETH deposit required to deter spam  
4. **Certificate Minting** using `CertificateNFT` through `CertificationAuthority`  

---

##  Project Structure (Scaffold-ETH 2)


```sh
├── packages/
│   ├── hardhat/               # Smart contracts & deployment logic
│   │   ├── contracts/
│   │   ├── deploy/
│   │   ├── deployments/
│   │   ├── test/
│   │   └── typechain-types/
│   │
│   ├── nextjs/                # Frontend dApp (React + Wagmi + Tailwind)
│   │   ├── components/
│   │   ├── pages/
│   │   └── hooks/
│
├── scripts/                   # Automation / interaction scripts
└── foundry.toml               # Optional if integrating Foundry tooling

```

---

## Tech Stack

- **Scaffold-ETH 2**  
- **Solidity**  
- **Hardhat**  
- **TypeChain**  
- **Ether.js**  
- **Next.js + Tailwind CSS**  
- **Wagmi + RainbowKit**  
- **OpenZeppelin Contracts**  

---

## Testing

```sh
yarn test
```

Run all smart contract tests from `packages/hardhat/test`.

---

##  License

[MIT License](./LICENCE)

---

## Contacts - Collaborators

For collaborations, questions, or contributions:

 - [@0xJonaseb11](https://github.com/0xJonaseb11)
 - [@Iot-clementregis](https://github.com/Iot-clementregis)
