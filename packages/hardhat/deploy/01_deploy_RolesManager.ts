import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";


const deployRolesManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {


  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("RolesManager", {
    from: deployer,

    args: [],

    log: true,
    autoMine: true,
  });


  const rolesManager = await hre.ethers.getContract<Contract>("RolesManager", deployer);
  console.log("✅ RolesManager contract deployed sufcessfully!!");
};

export default deployRolesManager;
deployRolesManager.tags = ["RolesManager"];

