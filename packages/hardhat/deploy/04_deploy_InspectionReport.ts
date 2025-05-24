import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployInspectionReport: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const certificationAuthority = await get("CertificationAuthority");

  await deploy("InspectionReport", {
    from: deployer,
    args: [certificationAuthority.address],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inspectionReport = await hre.ethers.getContract<Contract>("InspectionReport", deployer);

  console.log("✅ InspectionReport contract deployed sufcessfully!!");

};

export default deployInspectionReport;
deployInspectionReport.tags = ["InspectionReport"];
