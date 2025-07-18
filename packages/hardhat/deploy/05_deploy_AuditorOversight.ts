import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployAuditorOversight: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const rolesManager = await hre.deployments.get("RolesManager");
  const inspectionManager = await hre.deployments.get("InspectionManager");
  const certificationAuthority = await hre.deployments.get("CertificationAuthority");

  await deploy("AuditorOversight", {
    from: deployer,
    args: [rolesManager.address, inspectionManager.address, certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auditorOversight = await hre.ethers.getContract<Contract>("AuditorOversight", deployer);

  console.log("✅ AuditorOversight contract deployed successfully!!");
};

export default deployAuditorOversight;
deployAuditorOversight.tags = ["AuditorOversight"];
