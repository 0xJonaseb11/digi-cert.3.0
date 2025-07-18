import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployEnterpriseRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const rolesManager = await hre.deployments.get("RolesManager");
  const certificationAuthority = await hre.deployments.get("CertificationAuthority");
  const certificateNFT = await hre.deployments.get("CertificateNFT");
  await deploy("EnterpriseRegistry", {
    from: deployer,
    args: [rolesManager.address, certificationAuthority.address, certificateNFT.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enterpriseRegistry = await hre.ethers.getContract<Contract>("EnterpriseRegistry", deployer);

  console.log("✅ InterpriseRegistry contract deployed successfully!!");
};

export default deployEnterpriseRegistry;
deployEnterpriseRegistry.tags = ["EnterpriseRegistry"];
