import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCertificateNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const certificationAuthority = await get("CertificationAuthority");

  await deploy("CertificateNFT", {
    from: deployer,
    args: [certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const certificateNFT = await hre.ethers.getContract<Contract>("CertificateNFT", deployer);

  console.log("✅ CertificateNFT contract deployed sufcessfully!!");

};

export default deployCertificateNFT;
deployCertificateNFT.tags = ["CertificateNFT"];
