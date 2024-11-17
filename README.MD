# Build your own Token 🪙🫡

### Environment Setup

- Fork the repo at https://github.com/BlockchainUSC/Spring-2023-Build-Night-2
- Navigate to the folder where you want to store your repo in your terminal
- Clone the repo by typing `git clone <URL>`, where `<URL>` is the link that appears after hitting the green **Code** button in the top right of your repo.


### Getting Started
- Open the folder that contains the repo for Build Night 3 in Visual Studio Code (or your preferred IDE)
- Create a new Terminal window by hitting terminal in the top left and clicking new terminal
- Navigate to the Build Night 3 folder in terminal
- Create a new folder called blockchain: `mkdir blockchain`
- Navigate to the blockchain folder: `cd blockchain`

### Setting up Hardhat
- Run the command `npm install -d hardhat@latest @nomicfoundation/hardhat-ethers ethers@6.1.0`
  - Installs Hardhat, Hardhat plugin for ethers.js, and the ethers.js library
- Run the command: `npx hardhat init`
  - Select Typescript Project 
  - project root is the current directory (hit enter)
  - add gitignore: y 
  - Install this sample project’s dependencies with npm: y


## Setting up Open Zeppelin
- Run the command `npm install @openzeppelin/contracts`

## Creating your env file to store your API Key and Private Key

- Run the command `npm install dotenv` followed by `npm install --save-dev @types/dotenv` to install the necessary dependencies 

- In the blockchain folder, create a file called `.env` and add your private key without the 0x prefix, `PRIVATE_KEY=your_private_key_here`

- Also add your API URL like this `API_URL=AlCHEMY_URL`

## What is ERC-20?
Ethereum Request for Comment number 20
ERC-20 is a token standard that ensures that all tokens have some identical properties to other tokens. Most importantly, tokens must be fungible (all tokens of the same type have the same value properties).
In order to adhere to ERC-20 token standard, a smart contract defining a smart token must implement the following functions:
- **TotalSupply**: defines the total number of tokens in circulation, will stop creating new tokens once reached
- **Balance**: returns the number of tokens held by a certain wallet address
- **Transfer**: transfers tokens from total supply and sends it to a specific address
- **TransferFrom**: transfers tokens between addresses
- **Approve**: allows the smart contract to send tokens to an address considering total supply
- **Allowance**: checks if a current wallet address has enough tokens to send to another address

## Use Cases of ERC-20
- **Initial Coin Offerings** - used to fundraise for new project, tokens can represent stake in project
- **Utility Tokens** - BAT (Basic Attention Token) used by Brave ecosystem to reward viewers for interacting with advertisements and content creators for generating content
- **Stablecoins** - USDC and Tether (USDC) and (USDT) are both widely used stablecoins that are pegged to the US Dollar. Stablecoins are important for many use-cases that necessitate providing a reliable medium of exchange – payment, DeFi etc. 


## OpenZeppelin
The OpenZeppelin Contracts Wizard is an online interactive generator in which you can bootstrap your contracts. The wizard comprises five different sections, including token selection, settings, features, access control, and interactive code display. Currently, the wizard supports three ERC standards:
- ERC20 – A fungible token standard that follows EIP-20, such as fiat currencies.
- ERC721 – Is an NFT token standard that follows EIP-721.
- ERC1155 – Represents both fungible and non-fungible tokens. It is known as a multi-token contract and follows EIP-1155.

## Token Smart Contract
- Inside of blockchain/contracts, delete Lock.sol and create a file called "<YOUR_TOKEN_NAME>".sol and copy the following code into the file:

📌 Note: My token is named Turtle, so anywhere you see Turtle in the following code, you should replace with the name of your token.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
contract Turtle is ERC20 {  // Na is the name of our custom token, ERC20 is the standard we are inheriting

    uint constant _initial_supply = 100 * (10**18);  // setting variable for how many of your own tokens are initially put into your wallet, feel free to edit the first number but make sure to leave the second number because the token has 18 decimal places


    uint constant _max_supply = 200 * (10**18); // variable to keep track of the total supply of tokens


    address public owner; 
    event TokensMinted(address to, uint256 amount); 
    event TokensBurned(address from, uint256 amount);
    /* ERC 20 constructor takes in 2 strings, feel free to change the first string to the name of your token name, and the second string to the corresponding symbol for your custom token name */
    constructor() ERC20("Turtle", "TUR") {
        _mint(msg.sender, _initial_supply);
        owner = msg.sender;
    }
}

```

The above code sets up our **state** variables, which are permanent variable stored in our smart contract.

Then we update our initial supply and our max supply, which have to be multiples of 10^18. 

We need multiples of 10^18 because the token has 18 decimal places so if we multiply by 10^18, we can achieve 100 tokens rather than some fractional amount of tokens.

I set my initial supply to 100 tokens and my max supply to 200 tokens but you can choose any numbers – just make sure max supply > initial supply so you can mint more tokens later. 

Next, we create a variable of type address to hold the address of the owner/creator of the token.  

After, we create two events. **Events** are ways to log transactions/changes to our smart contract on the blockchain. Any software like our frontend can wait to be notified about these events rather than constantly polling for a transaction. The two events are emmitted when tokens are minted or tokens are burned.

Lastly, we need to edit the constructor to create our Token. The constructor is inherited from ERC20, so we need to pass in the initial Token Name and Token Symbol.

Then, we call the inherited mint function, passing in the address of the function caller and the initial supply we initially defined. The mint function sends the supply to the address that called the function. We also update our owner state variable to be the address that called the function. 

📌 Note: In this case, we compile/deploy the smart contract using the private key in our .env file so that associated account will be the owner of the token.

### Modifier 
Add the following **modifier** to the smart contract:

```solidity 
  modifier onlyOwner() {
    require(msg.sender == owner, "Caller is not the owner");
    _;
  }
```

A **modifier** is used to add conditions to how and when a function can be called and what kind of users can call it.

Modifiers can take parameters but don't have return values.

There are many built in modifiers that we have and will use in the future such as: pure, view, payable, etc.

**📌 Note:** ERC-20 has a built-in OnlyOwner modifier but mine was throwing an error so I decided to write my own – but let me know if you get it working :)

This modifier can be added to functions to make sure that only the owner of the token can call them.

### Mint Function

Add the following **mint** function to your smart contract:

```solidity
 function mint(address to, uint256 amount) public onlyOwner {
      require(totalSupply() + amount <= _max_supply, "Minting would exceed max supply");
      _mint(to, amount);
      emit TokensMinted(to, amount);
    }
```

This function is modified by the onlyOwner modifier we just defined.

Its parameters are the address we are minting to and the amount we are minting. 

The **require** statement ensures that we are still under the maximum supply after we call this method. totalSupply() is an ERC-20 method that returns the total number of tokens currently in circulation.

Next, we call the ERC-20 mint function again.

Lastly, we emit the TokensMinted event.

### Burn Tokens 

Copy the following **burn** function into your smart contract: 

```solidity
function burn(uint256 amount) public {
  require(balanceOf(msg.sender) >= amount, "Insufficient balance");
  require(amount <= totalSupply(), "Amount exceeds total supply");
  _burn(msg.sender, amount);  
  emit TokensBurned(msg.sender, amount);
  }

```

The function takes in an amount parameter for how many tokens we plan on burning.

The first **require** statement checks if the address calling the function has enough tokens to burn by using the ERC-20 function balanceOf to get the account's balance.

The second **require** statement checks if the amount that the user is trying to burn is greater than the totalSupply currently in circulation.

Next, we call the ERC-20 burn function which takes in the amount to burn and the account burning them.

Lastly, we emit the TokensBurned event.


### Send Tokens Function
Copy the following **sendTokens** function into your smart contract:

```solidity
function sendTokens(address to, uint256 amount) public {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    transfer(to, amount);
  }

```

This function takes in two paramters: the address to send the tokens to and the amount of tokens to send.

The **require** statement ensures that the address calling the function has enough funds to send to the recipient.

Next, we call the ERC-20 transfer amount to transfer the token.


### Get Token Info Function

Copy the following **getTokenInfo** function into your smart contract:

```solidity
function getTokenInfo() public view returns (string memory, string memory, uint256, uint256) {
    return (name(), symbol(), totalSupply(), balanceOf(msg.sender));
  }
```

This is a view function that returns the value of data members of our token using ERC-20 functions.


### Deploy Script
Create a folder called scripts within the blockchain folder and add a file to it called deploy.ts

Copy the following code into it:

```solidity

import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await ethers.provider.getBalance(deployer.address);
    
    console.log("Account balance:", ethers.formatEther(balance));
  
    const Token = await ethers.getContractFactory("Turtle");
    const token = await Token.deploy();
    
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
  
    console.log("Token address:", tokenAddress);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});

```


### Update your hardhat.config.ts 

Update your hardhat.config.ts to look like this

```solidity
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const Private_Key = process.env.PRIVATE_KEY;
const API_URL= process.env.API_URL;

if (!Private_Key || !API_URL) {
  throw new Error("Missing PRIVATE_KEY or API_URL in .env file");
}

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `${API_URL}`,
      accounts: [`0x${Private_Key}`],
      chainId: 11155111,
    },
  },
};

export default config;
```

### Run and Deploy Smart Contract
Run `npx hardhat compile` to compile the smart contract

Run `npx hardhat run scripts/deploy.ts --network sepolia` to run the script to deploy the smart contract

You should see an output like:

>Deploying contracts with the account: 0xE19496E993F05Ec1B03D1d456dF6B8227E50deA1
>Account balance: 1.139776643967059959
>Token address: 0x065d4BE841d9CA4B1906Fea6a013e5f16c51FB51

You can view your transaction at https://sepolia.etherscan.io/ by copy pasting the address into the search bar

*_Save_* your token address, we’ll use it again later!


### Integrate with Frontend

Navigate to frontend folder in terminal

Run `npm install`

Run `npm install ethers@5`

Run `npm run start` to view current frontend of our page

Copy the **TokenName.json** file from the artifacts/contracts folder in the blockchain folder into the src/app folder in the frontend

Add import token from "./TokenName.json"; into the top of the src/app/page.tsx file

At the top of the Home() function, add the following code:

```soldity
const [contract, setContract] = useState();
const contractAddress = "<YOUR_CONTRACT_ADDRESS>";
let signer;
```

#### Update the OnClickConnect function
Store information about the signer, contract abi, and contract address when instantiating the contract object

Update your onClickConnect function to appear like the one below:


```solidity

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


```

## Frontend Javascript Functions


### Get Token Info

Add the following function to your export default Home function:

```solidity
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
```

We first extract the key data members from our ERC-20 smart contract: name, symbol, totalSupply, and the current account's balance. These data members are inherited in our contract from the ERC-20 template.

Convert the totalSupply and userBalance from their raw BigNumber into human-readable strings since the balance of a token is typically in 18 digits.

Update our token object with the new data members we received from our contract. These updates reflect in the frontend of our website.

Lastly, add a useEffect function that will force token data to be fetched again from our contract every time our contract is recompile/redeployed or current account is changed (a new user signs in).

### Mint Tokens

Copy the following mint tokens function into your export default home function: 

```solidity
const mintTokens = async (e) => {
    e.preventDefault();
    if (contract== undefined) {
      alert("Please connect to MetaMask");
      return;
    }

    try {
      // Convert the mint amount to a BigNumber using ethers
      const amountToMint = ethers.utils.parseUnits(mintAmount, 18); // Assuming 18 decimals
  
      const tx = await contract.mint(currentAccount, amountToMint);
  
      await tx.wait(); 
      fetchTokenData();
      console.log("Minting successful", amountToMint.toString());
    } catch (error) {
      console.error("Minting failed:", error);
    }


  };

```

- This function begins by preventing page refresh. 
- Then, we ensure that the user's MetaMask wallet is connected and the contract object has been initialized properly
- It then parses the user's string input to a BigNumber with 18 digits, which is the units that our smart contract reads/stores token amounts in. 
- Then, we call our contract's mint function and wait for it to be confirmed. 
- Then, we update the token information so the changes are reflected in our frontend.


### Burn Tokens
Copy the following burn tokens function into your export default home function: 

```solidity
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
```

- This function begins by preventing page refresh.
- Then, we ensure that the user's MetaMask wallet is connected and the contract object has been initialized properly
- It then parses the user's string input to a BigNumber with 18 digits, which is the units that our smart contract reads/stores token amounts in. 
- Then, we call our contract's burn tokens function and wait for it to be confirmed. 
- Then, we update the token information so the changes are reflected in our frontend.

### Send tokens
Copy the following send tokens function into your export default home function: 

```solidity
const sendTokens = async (e) => {
    e.preventDefault();
    if (contract== undefined) {
      alert("Please connect to MetaMask");
      return;
    }

    try {
      // Convert the send amount to a BigNumber using ethers
      const amountToSend = ethers.utils.parseUnits(sendAmount, 18); 
  
      const tx = await contract.transfer(sendAccount, amountToSend);
  
      await tx.wait(); 
      fetchTokenData();
      console.log("Sending successful", amountToSend.toString());
  
    } catch (error) {
      console.error("Sending failed:", error);
    }

  };

```

- This function begins by preventing page refresh.
- Then, we ensure that the user's MetaMask wallet is connected and the contract object has been initialized properly
- It then parses the user's string input to a BigNumber with 18 digits, which is the units that our smart contract reads/stores token amounts in. 
- Then, we call our contract's send tokens function and wait for the transaction to be confirmed. 
- Then, we update the token information so the changes are reflected in our frontend.



















