/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";
import { FaWallet } from "react-icons/fa";

const customStyles = `
  .connect-wallet-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    font-weight: 600;
    background: linear-gradient(to right, #3B82F6, #06B6D4);
    color: white;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    min-height: 48px;
    border: none;
  }
  .connect-wallet-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .connect-wallet-button:active {
    transform: scale(0.98);
  }
  .connect-wallet-button.wrong-network {
    background: #EF4444;
  }
  .connect-wallet-button.connected {
    background: linear-gradient(to right, #10B981, #059669);
  }
  .connect-wallet-button .bracket-left-top,
  .connect-wallet-button .bracket-left-bottom,
  .connect-wallet-button .bracket-right-top,
  .connect-wallet-button .bracket-right-bottom {
    position: absolute;
    height: 2px;
    width: 12px;
    background: white;
  }
  .connect-wallet-button .bracket-left-top {
    top: 0;
    left: 0;
    border-top-right-radius: 2px;
  }
  .connect-wallet-button .bracket-left-bottom {
    bottom: 0;
    left: 0;
    border-bottom-right-radius: 2px;
  }
  .connect-wallet-button .bracket-right-top {
    top: 0;
    right: 0;
    border-top-left-radius: 2px;
  }
  .connect-wallet-button .bracket-right-bottom {
    bottom: 0;
    right: 0;
    border-bottom-left-radius: 2px;
  }
  .connect-wallet-button .bracket-left,
  .connect-wallet-button .bracket-right {
    position: absolute;
    width: 2px;
    top: 0;
    bottom: 0;
    background: white;
  }
  .connect-wallet-button .bracket-left {
    left: 0;
  }
  .connect-wallet-button .bracket-right {
    right: 0;
  }
`;

const ConnectWalletButton: React.FC = () => {
  return (
    <>
      <style>{customStyles}</style>
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, authenticationStatus, mounted, openChainModal, openAccountModal }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected = ready && account && chain;
          const isConnecting = authenticationStatus === "loading";

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} className="connect-wallet-button">
                      <div className="bracket-left-top" />
                      <div className="bracket-left-bottom" />
                      <div className="bracket-left" />
                      <div className="bracket-right-top" />
                      <div className="bracket-right-bottom" />
                      <div className="bracket-right" />
                      {isConnecting ? <Loader2 className="animate-spin w-5 h-5" /> : <FaWallet size={20} />}
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} className="connect-wallet-button wrong-network">
                      <div className="bracket-left-top" />
                      <div className="bracket-left-bottom" />
                      <div className="bracket-left" />
                      <div className="bracket-right-top" />
                      <div className="bracket-right-bottom" />
                      <div className="bracket-right" />
                      Wrong Network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <button onClick={openAccountModal} className="connect-wallet-button connected">
                      <div className="bracket-left-top" />
                      <div className="bracket-left-bottom" />
                      <div className="bracket-left" />
                      <div className="bracket-right-top" />
                      <div className="bracket-right-bottom" />
                      <div className="bracket-right" />
                      {account.displayName}
                    </button>
                    <button onClick={openChainModal} className="connect-wallet-button connected">
                      <div className="bracket-left-top" />
                      <div className="bracket-left-bottom" />
                      <div className="bracket-left" />
                      <div className="bracket-right-top" />
                      <div className="bracket-right-bottom" />
                      <div className="bracket-right" />
                      {chain.iconUrl && (
                        <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} className="w-5 h-5 rounded-full" />
                      )}
                      {chain.name}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default ConnectWalletButton;
