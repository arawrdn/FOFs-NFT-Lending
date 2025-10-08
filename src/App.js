import React, { useState } from "react";
import { AppKitProvider, useAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { rules } from "./lendingRules";

function LendingDashboard() {
  const { account } = useAppKit(WagmiAdapter);
  const [lentNFTs, setLentNFTs] = useState([]);
  const [borrowedNFTs, setBorrowedNFTs] = useState([]);

  const lendNFT = () => {
    const nftId = prompt("Enter NFT ID to lend:");
    const interest = prompt(`Set interest rate (%) [${rules.minInterest}-${rules.maxInterest}]:`);
    const duration = prompt(`Duration in days [${rules.minDuration}-${rules.maxDuration}]:`);
    if (!nftId) return;

    setLentNFTs([...lentNFTs, { nftId, interest, duration }]);
    alert(`NFT ${nftId} lent for ${duration} days at ${interest}% interest`);
  };

  const borrowNFT = () => {
    const nftId = prompt("Enter NFT ID to borrow:");
    if (!nftId) return;

    setBorrowedNFTs([...borrowedNFTs, { nftId }]);
    alert(`NFT ${nftId} borrowed`);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial, sans-serif" }}>
      <h1>🌟 FOFs NFT Lending/Borrowing 🌟</h1>
      {account && <p>Account: {account}</p>}
      <button onClick={lendNFT}>Lend NFT</button>
      <button onClick={borrowNFT} style={{ marginLeft: 10 }}>Borrow NFT</button>

      <h2>Lent NFTs</h2>
      <ul>
        {lentNFTs.map((n, i) => (
          <li key={i}>
            NFT {n.nftId} - {n.interest}% for {n.duration} days
          </li>
        ))}
      </ul>

      <h2>Borrowed NFTs</h2>
      <ul>
        {borrowedNFTs.map((n, i) => (
          <li key={i}>NFT {n.nftId}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <AppKitProvider>
      <LendingDashboard />
    </AppKitProvider>
  );
}
