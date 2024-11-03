import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/sDJZAU5yfGAyK8D3OJcCkWP2BUUi-nig`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};

export default config;
