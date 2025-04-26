import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCertificationAuthority: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  await deploy("EnterpriseRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const certificationAuthority = await hre.ethers.getContract<Contract>("EnterpriseRegistry", deployer);
  console.log("EnterpriseRegistry contract deployed at:", certificationAuthority.address);
};

export default deployCertificationAuthority;
deployCertificationAuthority.tags = ["EnterpriseRegistry"];
