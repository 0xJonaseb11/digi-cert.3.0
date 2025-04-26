const { ethers } = require("hardhat");
const { artifacts } = require("hardhat");

// const { ethers } = require("@nomiclabs/hardhat-ethers");

console.log(ethers);


const main = async () => {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account: ", deployer.address);

    // members of GovernanceDAO
    const members = [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
        "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
    ];

    const CertificateTokenization = await ethers.getContractFactory("CertificateTokenization");
    console.log("Deploying CertificateTokenization contract...");
    const certificateTokenization = await CertificateTokenization.deploy();
    // await certificateTokenization.deployed();

    const CertificationManager = await ethers.getContractFactory("CertificationManager");
    console.log("Deploying CetificationManagercontract...");
    const certificationManager = await CertificationManager.deploy();
    // await certificationManager.deployed();

    const EnterpriseRegistry = await ethers.getContractFactory("EnterpriseRegistry");
    console.log("Deploying EnterpriseRegistry contract...");
    const enterpriseRegistry = await EnterpriseRegistry.deploy();
    // await enterpriseRegistry.deployed();

    const GovernanceDAO = await ethers.getContractFactory("GovernanceDAO");
    console.log("Deploying GovernanceDAO contract...");
    const governanceDAO = await GovernanceDAO.deploy(members);
    // await governanceDAO.deployed();

    // console contract addresses
    console.log("CertificateTokenization contract deployed at: ", certificateTokenization.target);
    console.log("CertificationManager contract deployed at: ", certificationManager.target);
    console.log("EnterpriseRegistry contract deloyed at: ", enterpriseRegistry.target);
    console.log("GovernanceDAO contract deployed at: ", governanceDAO.target);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(err) {
        console.log("An Error occurred while deploying contract!", err);
        process.exit(1);
    }
}

runMain();