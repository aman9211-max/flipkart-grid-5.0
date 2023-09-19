const CONTRACT_ADDRESS = "0xCFf9B67178Ebe6099B344743AA73130f43ED7a72"; // Replace with actual contract address
const CONTRACT_ABI = [
    // ... (Insert your contract ABI here)
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "rewardAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "expiryTimestamp",
            "type": "uint256"
          }
        ],
        "name": "RewardEarned",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "rewardAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "rewardExpiry",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "rewardThreshold",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "rewardValidityDuration",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "shoppingAmounts",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "shop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "isRewardValid",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
]; // Replace with actual contract ABI

let web3;
let contract;

async function initWeb3() {
    if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
            console.log("Web3 initialized:", contract);
            displayRewardStatus();
            displayRewardsEarned();
        } catch (error) {
            console.error("User denied account access:", error);
        }
    } else {
        console.log("No Ethereum provider found. Please install MetaMask.");
    }
}

async function displayRewardStatus() {
    const accounts = await web3.eth.getAccounts();
    const rewardStatus = await contract.methods.isRewardValid(accounts[0]).call();
    const rewardStatusElement = document.getElementById("rewardStatus");
    rewardStatusElement.textContent = `Your reward status: ${rewardStatus ? "Valid" : "Expired"}`;
}

async function displayRewardsEarned() {
    const accounts = await web3.eth.getAccounts();
    const rewardsEarned = await contract.methods.shoppingAmounts(accounts[0]).call();
    const rewardsEarnedElement = document.getElementById("rewardsEarned");
    rewardsEarnedElement.textContent = `Rewards Earned: ${rewardsEarned}`;
}

async function shop() {
    try {
        const accounts = await web3.eth.getAccounts();
        const shoppingAmount = document.getElementById("shoppingAmount").value;

        await contract.methods.shop(shoppingAmount).send({ from: accounts[0] });
        displayRewardStatus();
        displayRewardsEarned();
    } catch (error) {
        console.error("Error while shopping:", error);
    }
}


initWeb3();
