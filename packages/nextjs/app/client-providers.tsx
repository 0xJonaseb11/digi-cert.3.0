"use client";

import { Suspense } from "react";
import { ToastProvider } from "./lib/toast";
import { RainbowKitProvider, getDefaultWallets, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

const queryClient = new QueryClient();

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64";

const { connectors } = getDefaultWallets({
  appName: "DIGICERT",
  projectId: walletConnectProjectId,
});

const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, polygon, base, arbitrum, optimism],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {/* Custom RainbowKit modal gradients */}
          <style>{`
            .rk-modal {
              background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #f5f3ff 100%) !important;
              border-radius: 1.5rem !important;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            }
            .rk-wallet-list-button, .rk-connect-button {
              background: linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%) !important;
              color: #fff !important;
              border-radius: 0.75rem !important;
              font-weight: 600;
              transition: box-shadow 0.2s;
            }
            .rk-wallet-list-button:hover, .rk-connect-button:hover {
              box-shadow: 0 4px 16px 0 rgba(59, 130, 246, 0.15);
              filter: brightness(1.05);
            }
            .rk-modal-header {
              background: linear-gradient(90deg, #3B82F6 0%, #8b5cf6 100%) !important;
              color: #fff !important;
              border-top-left-radius: 1.5rem !important;
              border-top-right-radius: 1.5rem !important;
            }
          `}</style>
          <RainbowKitProvider
            modalSize="wide"
            theme={lightTheme({
              accentColor: "#3B82F6",
              accentColorForeground: "#fff",
              borderRadius: "large",
              fontStack: "rounded",
              overlayBlur: "large",
            })}
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
