import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // The networks on which your DApp is live (including Layer 2s)
  targetNetworks: [
    chains.hardhat,
    chains.shapeSepolia, // Test network
    chains.baseSepolia, // Test network
    chains.mainnet,
    chains.sepolia, // Test network
    chains.polygon,
    chains.optimism,
    chains.arbitrum,
    chains.base, // Layer 2 (Base)
    chains.shape, // Layer 2 (Shape)
    chains.zora, // Layer 2 (Zora)
  ],

  // The interval at which your front-end polls the RPC servers for new data
  pollingInterval: 30000,

  // This is Alchemy's default API key. You can replace it with your own.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // If you want to use a different RPC for a specific network, you can add it here.
  // The key is the chain ID, and the value is the HTTP RPC URL
  rpcOverrides: {
    [chains.polygon.id]: "https://polygon-rpc.com", // Polygon RPC URL
    [chains.optimism.id]: "https://optimism.io", // Optimism RPC URL
    [chains.arbitrum.id]: "https://arb1.arbitrum.io/rpc", // Arbitrum RPC URL
    // Add more if needed
  },

  // This is WalletConnect's default project ID. You can get your own at https://cloud.walletconnect.com
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on Hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
