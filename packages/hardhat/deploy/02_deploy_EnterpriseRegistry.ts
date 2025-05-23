import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployEnterpriseRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const certificationAuthority = await hre.deployments.get("CertificationAuthority");

  await deploy("EnterpriseRegistry", {
    from: deployer,
    args: [certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const enterpriseRegistry = await hre.ethers.getContract<Contract>("EnterpriseRegistry", deployer);
  console.log("✅ InterpriseRegistry contract deployed sufcessfully!!");
};

export default deployEnterpriseRegistry;
deployEnterpriseRegistry.tags = ["EnterpriseRegistry"];
