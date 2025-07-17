"use client";

import { Suspense } from "react";
import { ToastProvider } from "./lib/toast";
import { RainbowKitProvider, connectorsForWallets, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "~~/components/ThemeProvider";

// Configure chains and providers
const { chains, publicClient } = configureChains([mainnet, polygon, base, arbitrum, optimism], [publicProvider()]);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "default-project-id";

const connectors = connectorsForWallets([
  {
    groupName: "Installed",
    wallets: [metaMaskWallet({ chains, projectId }), phantomWallet({ chains, projectId })],
  },
  {
    groupName: "Supported Wallets",
    wallets: [
      walletConnectWallet({ chains, projectId }),
      ledgerWallet({ chains, projectId }),
      coinbaseWallet({ chains, appName: "DIGICERT" }),
      rainbowWallet({ chains, projectId }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  transport: http(),
});

const queryClient = new QueryClient();

const customTheme = lightTheme({
  accentColor: "#3B82F6",
  accentColorForeground: "#FFFFFF",
  borderRadius: "medium",
  overlayBlur: "small",
  fontStack: "system",
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            chains={chains}
            theme={customTheme}
            modalSize="compact"
            appInfo={{
              appName: "DIGICERT",
              learnMoreUrl: "https://learn.rainbow.me/what-is-a-web3-wallet",
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
