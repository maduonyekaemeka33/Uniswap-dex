import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const prov = new ethers.BrowserProvider(window.ethereum, "homestead");
      setProvider(prov);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return alert("No Ethereum wallet found");
    await provider.send("eth_requestAccounts", []);
    const s = await provider.getSigner();
    const addr = await s.getAddress();
    setSigner(s);
    setAccount(addr);
  };

  return (
    <WalletContext.Provider value={{ provider, signer, account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}
