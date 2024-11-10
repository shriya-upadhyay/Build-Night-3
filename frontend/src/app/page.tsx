"use client";
import token from "./Turtle.json";
import { useState, useEffect, use } from "react";
import { ethers, Contract } from "ethers";



export default function Home() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    userBalance: '',
  });

  const [mintAmount, setmintAmount] = useState('');
  const [burnAmount, setburnAmount] = useState('');
  const [sendAccount, setsendAccount] = useState('');
  const [sendAmount, setsendAmount] = useState('');
  const contractAddress = "0x420d54bD52AaeCa1b33575ECDdE502b0f8E400e2";
  let signer;


  const onClickConnect = async () => {
    if (!window.ethereum) {
      alert("please install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));

    signer = provider.getSigner();

    setContract(new ethers.Contract(contractAddress, token.abi, signer));
  };

  const fetchTokenData = async () => {
    if (contract) {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const totalSupply = await contract.totalSupply();
      const userBalance = await contract.balanceOf(currentAccount || '');

      const formattedSupply = ethers.utils.formatUnits(totalSupply, 18);
      const formattedBalance = ethers.utils.formatUnits(userBalance, 18);


      setTokenData({
        name,
        symbol,
        totalSupply: formattedSupply, // Convert to string if necessary
        userBalance: formattedBalance, // Convert to string if necessary
      });
    }
  };

  useEffect(() => {
    

    fetchTokenData();
  }, [contract, currentAccount]);


  const mintTokens = async (e) => {
    e.preventDefault();
    if (contract== undefined) {
      alert("Please connect to MetaMask");
      return;
    }

    try {
      // Convert the mint amount to a BigNumber using ethers
      const amountToMint = ethers.utils.parseUnits(mintAmount, 18); // Assuming 18 decimals
  
      // Call the mint function with the current account and amount
      const tx = await contract.mint(currentAccount, amountToMint);
  
      await tx.wait(); // Wait for the transaction to be mined
      fetchTokenData();
      console.log("Minting successful", amountToMint.toString());

      // Optionally: Fetch updated token data or inform the user of success
    } catch (error) {
      console.error("Minting failed:", error);
    }


  };


  const burnTokens = async (e) => {
    e.preventDefault();
    if (contract== undefined) {
      alert("Please connect to MetaMask");
      return;
    }

    try {
      // Convert the mint amount to a BigNumber using ethers
      const amountToBurn = ethers.utils.parseUnits(burnAmount, 18); // Assuming 18 decimals
  
      // Call the mint function with the current account and amount
      const tx = await contract.burn(amountToBurn);
  
      await tx.wait(); // Wait for the transaction to be mined
      fetchTokenData();
      console.log("Burning successful", amountToBurn.toString());
  
      // Optionally: Fetch updated token data or inform the user of success
    } catch (error) {
      console.error("Burning failed:", error);
    }


  };

  const sendTokens = async (e) => {
    e.preventDefault();
    if (contract== undefined) {
      alert("Please connect to MetaMask");
      return;
    }

    try {
      // Convert the mint amount to a BigNumber using ethers
      const amountToSend = ethers.utils.parseUnits(sendAmount, 18); // Assuming 18 decimals
  
      // Call the mint function with the current account and amount
      const tx = await contract.transfer(sendAccount, amountToSend);
  
      await tx.wait(); // Wait for the transaction to be mined
      fetchTokenData();
      console.log("Sending successful", amountToSend.toString());
  
      // Optionally: Fetch updated token data or inform the user of success
    } catch (error) {
      console.error("Sending failed:", error);
    }

  };


  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <p> Welcome to our token page!</p>
      <div className="card" style={{ width: '18rem' }}> 
      <p> Current account: {currentAccount}</p>
      <p> Token name: {tokenData.name}</p>
      <p> Token symbol: {tokenData.symbol}</p>
      <p> Token Supply: {tokenData.totalSupply} </p>
      <p> Your Balance: {tokenData.userBalance} </p>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
      <input
          type="text"
          value={mintAmount}
          onChange={(e) => setmintAmount(e.target.value)}
          placeholder="Amount to mint"
          className="border border-gray-300 p-2 rounded"
        />
      <button className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex-1" onClick={mintTokens}> Mint more tokens! </button>
      </div>
      <div className="flex space-x-2">
      <input
          type="text"
          value={burnAmount}
          onChange={(e) => setburnAmount(e.target.value)}
          placeholder="Amount to burn"
          className="border border-gray-300 p-2 rounded"
        />
     <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex-1" onClick={burnTokens}> Burn tokens! </button>
     </div>

     <div className="flex space-x-2">
      <input
          type="text"
          value={sendAccount}
          onChange={(e) => setsendAccount(e.target.value)}
          placeholder="Send to address"
          className="border border-gray-300 p-2 rounded"
        />

      <input 
          type="text"
          value={sendAmount}
          onChange={(e) => setsendAmount(e.target.value)}
          placeholder="Amount to send"
          className="border border-gray-300 p-2 rounded"
        />
     <button className="bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded flex-1" onClick={sendTokens}> Send tokens! </button>
     </div>
      <button className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded" onClick={onClickConnect}> {currentAccount ? "Connected" : "Connect to MetaMask"} </button>
      </div>


      </div>
  );

}

