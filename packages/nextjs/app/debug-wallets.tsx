"use client";

import { useEffect } from "react";

export default function DebugWallets() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.group("Wallet Detection Debug");
      console.log("Window.ethereum:", window.ethereum);

      // Detect EIP-6963 providers
      const handleProvider = (event: any) => {
        console.log("EIP-6963 Wallet Detected:", event.detail);
      };

      window.addEventListener("eip6963:announceProvider", handleProvider);
      window.dispatchEvent(new Event("eip6963:requestProvider"));

      // Detect legacy providers
      if (window.ethereum) {
        console.log("Legacy Providers:", window.ethereum.providers || [window.ethereum]);
      }

      // Phantom specific detection
      if (window.phantom?.ethereum) {
        console.log("Phantom EVM Detected");
        window.ethereum = window.phantom.ethereum;
      }

      console.groupEnd();

      return () => {
        window.removeEventListener("eip6963:announceProvider", handleProvider);
      };
    }
  }, []);

  return null;
}
