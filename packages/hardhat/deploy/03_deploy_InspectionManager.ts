import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployInspectorManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const certificationAuthority = await get("CertificationAuthority");

  await deploy("InspectorManager", {
    from: deployer,
    args: [certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  const inspectorManager = await hre.ethers.getContract<Contract>("InspectorManager", deployer);
  console.log("✅ InspectorManager deployed at:", inspectorManager.address);
};

export default deployInspectorManager;
deployInspectorManager.tags = ["InspectorManager"];
