import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployCertificationAuthority: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  //   const rolesManager = await hre.deployments.get("RolesManager");

  await deploy("CertificationAuthority", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const certificationAuthority = await hre.ethers.getContract<Contract>("CertificationAuthority", deployer);
  console.log("✅ CertificationAuthority contract deployed successfully!!");
};

export default deployCertificationAuthority;
deployCertificationAuthority.tags = ["CertificationAuthority"];
