import React, { useState, useEffect } from "react";
import { AppKitProvider, useAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { ethers } from "ethers";
import FOFsLendingABI from "./FOFsLending.json";

const CONTRACT_ADDRESS = "0x049ee6d2249c242611e1b704f0babaa8157d69eb"; // NFT CA for lending
const LENDING_CONTRACT = "0xYourDeployedContractAddress";

export default function App() {
  const { account, provider } = useAppKit(WagmiAdapter);
  const [loans, setLoans] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setContract(new ethers.Contract(LENDING_CONTRACT, FOFsLendingABI, signer));
    }
  }, [provider]);

  const lendNFT = async () => {
    const tokenId = prompt("Enter NFT ID to lend:");
    const interest = prompt("Interest %:");
    const duration = prompt("Duration (days):");
    if (!tokenId) return;
    await contract.lendNFT(tokenId, interest, duration);
    alert(`NFT ${tokenId} lent`);
  };

  const borrowNFT = async () => {
    const loanId = prompt("Enter Loan ID to borrow:");
    if (!loanId) return;
    await contract.borrowNFT(loanId);
    alert(`Loan ${loanId} borrowed`);
  };

  const fetchLoans = async () => {
    const data = await contract.getLoans();
    setLoans(data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🌟 FOFs NFT Lending/Borrowing On-Chain 🌟</h1>
      {account && <p>Account: {account}</p>}
      <button onClick={lendNFT}>Lend NFT</button>
      <button onClick={borrowNFT} style={{ marginLeft: 10 }}>Borrow NFT</button>
      <button onClick={fetchLoans} style={{ marginLeft: 10 }}>Refresh Loans</button>

      <h2>Active Loans</h2>
      <ul>
        {loans.map((loan, i) => (
          <li key={i}>
            TokenID: {loan.tokenId.toString()} | Lender: {loan.lender} | Borrower: {loan.borrower}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AppKitProvider>
      <App />
    </AppKitProvider>
  );
}
