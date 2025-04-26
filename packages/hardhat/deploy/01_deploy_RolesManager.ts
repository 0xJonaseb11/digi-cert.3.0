import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCertificationAuthority: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("RolesManager", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const certificationAuthority = await hre.ethers.getContract<Contract>("RolesManager", deployer);
  console.log("✅ RolesManager deployed at:", certificationAuthority.address);
};

export default deployCertificationAuthority;
deployCertificationAuthority.tags = ["RolesManager"];
