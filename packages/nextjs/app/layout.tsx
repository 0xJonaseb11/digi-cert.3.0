
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
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
import { Metadata } from "next";
import { WagmiProvider, http } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { configureChains, createConfig } from 'wagmi'
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "DIGICERT - Blockchain Certificates",
  description: "Secure digital certificates powered by blockchain technology",
  keywords: "blockchain, certificates, digital credentials, certification, verification",
  openGraph: {
    title: "DIGICERT | Blockchain Certificates",
    description: "Secure digital certificates powered by blockchain technology",
    images: ["/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIGICERT | Blockchain Certificates",
    description: "Secure digital certificates powered by blockchain technology",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Configure chains and providers
const { chains, publicClient } = configureChains([mainnet, polygon, base, arbitrum, optimism], [WagmiProvider()]);

// Set up wallet connectors
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

// Set up wagmi config
const wagmiConfig = createConfig({
  chains,
  connectors,
  publicClient,
  transport: chain => http(),
});

const queryClient = new QueryClient();

// Custom theme
const customTheme = lightTheme({
  accentColor: "#3B82F6",
  accentColorForeground: "#FFFFFF",
  borderRadius: "medium",
  overlayBlur: "small",
  fontStack: "system",
});

function ScaffoldEthAppWithProviders({ children }: { children: React.ReactNode }) {
  return (
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
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} min-h-screen`}>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
          <ScaffoldEthAppWithProviders>
            <ThemeProvider enableSystem>
              {children}
              <ToastProvider />
            </ThemeProvider>
          </ScaffoldEthAppWithProviders>
        </Suspense>
      </body>
    </html>
  );
}

function configureChains(chains: any[], providers: any[]) {
  return {
    chains,
    publicClient: providers[0]({ chains }),
  };
}
