import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await ethers.provider.getBalance(deployer.address);
    
    console.log("Account balance:", ethers.formatEther(balance));
  
    const Token = await ethers.getContractFactory("Trojan");
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