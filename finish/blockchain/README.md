# Build your own Token 🪙🫡

### Environment Setup

- Fork the repo at https://github.com/BlockchainUSC/Spring-2023-Build-Night-2
- Navigate to the folder where you want to store your repo in your terminal
- Clone the repo by typing `git clone <URL>`, where `<URL>` is the link that appears after hitting the green **Code** button in the top right of your repo.


### Getting Started
- Open the folder that contains the repo for Build Night 3 in Visual Studio Code (or your preferred IDE)
- Create a new Terminal window by hitting terminal in the top left and clicking new terminal
- Navigate to the Build Night 3 folder in terminal
- Type in the command: `cd start` to enter the starting code directory
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
- Run the command `npm install dotenv`


## Creating your env file to store your API Key and Private Key
- In the blockchain folder, create a file called `.env` and add your private key without the 0x prefix, `PRIVATE_KEY=your_private_key_here`

- Also add your API URL like this `API_URL=AlCHEMY_URL`



