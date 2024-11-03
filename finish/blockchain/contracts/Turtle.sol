//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
 // OpenZeppelin package contains implementation of the ERC 20 standard, which our NFT smart contract will inherit
contract Turtle is ERC20 {  // Trojan is the name of our custom token, ERC20 is the standard we are inheriting, and Ownable is the contract we are inheriting
    uint constant _initial_supply = 100 * (10**18);  // setting variable for how many of your own tokens are initially put into your wallet, feel free to edit the first number but make sure to leave the second number because we want to make sure our supply has 18 decimals
    uint constant _max_supply = 200 * (10**18); // variable to keep track of the total supply of tokens
    address public owner; 
    event TokensMinted(address to, uint256 amount); 
    event TokensBurned(address from, uint256 amount);
    /* ERC 20 constructor takes in 2 strings, feel free to change the first string to the name of your token name, and the second string to the corresponding symbol for your custom token name */
    constructor() ERC20("Turtle", "TUR") {
        _mint(msg.sender, _initial_supply);
        owner = msg.sender;
    }

    // Modifier to check if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
            require(totalSupply() + amount <= _max_supply, "Minting would exceed max supply");
            _mint(to, amount);
            emit TokensMinted(to, amount);
    }

    function burn(uint256 amount) public {
            require(balanceOf(msg.sender) >= amount, "Insufficient balance");
            require(amount <= totalSupply(), "Amount exceeds total supply");
            _burn(msg.sender, amount);  
            emit TokensBurned(msg.sender, amount);
    }

    function getTokenInfo() public view returns (string memory, string memory, uint256, uint256) {
        return (name(), symbol(), totalSupply(), balanceOf(msg.sender));
    }

    function sendTokens(address to, uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        transfer(to, amount);
    }
}