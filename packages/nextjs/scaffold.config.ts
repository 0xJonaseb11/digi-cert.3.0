import CertificationAuthority from "../hardhat/artifacts/contracts/core/CertificationAuthority.sol/CertificationAuthority.json";
import FinesEngine from "../hardhat/artifacts/contracts/core/FinesEngine.sol/FinesEngine.json";
import RolesManager from "../hardhat/artifacts/contracts/core/RolesManager.sol/RolesManager.json";
import AuditorOversight from "../hardhat/artifacts/contracts/modules/AuditorOversight.sol/AuditorOversight.json";
import CertificateNFT from "../hardhat/artifacts/contracts/modules/CertificateNFT.sol/CertificateNFT.json";
import EnterpriseRegistry from "../hardhat/artifacts/contracts/modules/EnterpriseRegistry.sol/EnterpriseRegistry.json";
import InspectionManager from "../hardhat/artifacts/contracts/modules/InspectionManager.sol/InspectionManager.json";
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  contracts: {
    CertificationAuthority: {
      address: string;
      abi: any;
    };
    FinesEngine: {
      address: string;
      abi: any;
    };
    RolesManager: {
      address: string;
      abi: any;
    };
    AuditorOversight: {
      address: string;
      abi: any;
    };
    CertificateNFT: {
      address: string;
      abi: any;
    };
    EnterpriseRegistry: {
      address: string;
      abi: any;
    };
    InspectionManager: {
      address: string;
      abi: any;
    };
  };
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  targetNetworks: [
    chains.hardhat,
    chains.mainnet,
    chains.sepolia,
    chains.polygon,
    chains.optimism,
    chains.arbitrum,
    chains.base,
    chains.shape,
    chains.zora,
    chains.flare,
    chains.lisk,
    chains.shapeSepolia,
    chains.baseSepolia,
    chains.zoraSepolia,
    chains.arbitrumSepolia,
    chains.polygonMumbai,
    chains.polygonZkEvm,
    chains.polygonZkEvmTestnet,
    chains.flareTestnet,
    chains.liskSepolia,
  ],

  pollingInterval: 30000,

  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: true,

  contracts: {
    CertificationAuthority: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Replace with actual address
      abi: CertificationAuthority.abi,
    },
    FinesEngine: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // Replace with actual address
      abi: FinesEngine.abi,
    },
    RolesManager: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // Replace with actual address
      abi: RolesManager.abi,
    },
    AuditorOversight: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", // Replace with actual address
      abi: AuditorOversight.abi,
    },
    CertificateNFT: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", // Replace with actual address
      abi: CertificateNFT.abi,
    },
    EnterpriseRegistry: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F", // Replace with actual address
      abi: EnterpriseRegistry.abi,
    },
    InspectionManager: {
      address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853", // Replace with actual address
      abi: InspectionManager.abi,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
