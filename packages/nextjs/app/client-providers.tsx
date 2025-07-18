"use client";

import { Suspense } from "react";
import { ToastProvider } from "./lib/toast";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { coinbaseWallet, injected, metaMask, safe, walletConnect } from "@wagmi/connectors";
import { http } from "viem";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { ThemeProvider } from "~~/components/ThemeProvider";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64";

// Minimal change here - using getDefaultConfig properly
const config = getDefaultConfig({
  appName: "DIGICERT",
  projectId,
  chains: [mainnet, polygon, base, arbitrum, optimism],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    metaMask({ dappMetadata: { name: "DIGICERT" } }),
    coinbaseWallet({ appName: "DIGICERT" }),
    walletConnect({ projectId, showQrModal: true }),
    safe(),
  ],
});

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            appInfo={{
              appName: "DIGICERT",
              learnMoreUrl: "https://learn.rainbow.me/what-is-a-web3-wallet",
            }}
            appearance={{
              walletList: ["detected_wallets", "metamask", "coinbase_wallet", "wallet_connect", "phantom", "ledger"],
            }}
          >
            <ThemeProvider enableSystem>
              {children}
              <ToastProvider />
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Suspense>
  );
}
