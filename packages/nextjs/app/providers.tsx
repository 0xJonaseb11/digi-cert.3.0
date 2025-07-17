"use client";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;
if (!walletConnectProjectId) {
  throw new Error("NEXT_PUBLIC_WALLETCONNECT_ID is not defined");
}

const { connectors } = getDefaultWallets({
  appName: "DIGICERT",
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon, optimism, arbitrum],
});

const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ThemeProvider attribute="class" enableSystem>
            {children}
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
