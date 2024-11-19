"use client";
import token from "./Turtle.json";
import { useState, useEffect, use } from "react";
import { ethers, Contract } from "ethers";



export default function Home() {

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

};

