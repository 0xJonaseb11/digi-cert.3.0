import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployInspectorManager: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const rolesManager = await get("RolesManager");
  const certificationAuthority = await get("CertificationAuthority");

  await deploy("InspectionManager", {
    from: deployer,
    args: [rolesManager.address, certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inspectorManager = await hre.ethers.getContract<Contract>("InspectionManager", deployer);

  console.log("✅ InspectionManager contract deployed successfully!!");

};

export default deployInspectorManager;
deployInspectorManager.tags = ["InspectionManager"];
