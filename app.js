// Update this with your contract address and ABI
const contractAddress = '0x541D934acEe4971c4068092A7e317475D9dcAf2B';
const contractABI = [
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
                "name": "amount",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "issuanceTimestamp",
                "type": "uint256"
              }
            ],
            "name": "PointsEarned",
            "type": "event"
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
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "PointsRedeemed",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "issuanceTimestamp",
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
            "name": "loyaltyPoints",
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
            "name": "loyaltyPointsValidityDuration",
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
            "name": "earnPoints",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "redeemPoints",
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
            "name": "getUserPoints",
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
                "name": "duration",
                "type": "uint256"
              }
            ],
            "name": "setLoyaltyPointsValidityDuration",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "maxShoppingAmount",
                "type": "uint256"
              }
            ],
            "name": "claimRandomReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }    

]; // Replace with your contract's ABI

let web3;
let contract;

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        document.getElementById('userAddress').textContent = accounts[0];
        updatePoints();
    } else {
        console.log('Metamask not detected');
    }
}

async function updatePoints() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];
    const points = await contract.methods.getUserPoints(userAddress).call();
    document.getElementById('loyaltyPoints').textContent = points;
}

async function earnPoints() {
    const earnAmount = document.getElementById('earnAmount').value;
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    try {
        await contract.methods.earnPoints(earnAmount).send({ from: userAddress, value: web3.utils.toWei(earnAmount) });
        updatePoints();
    } catch (error) {
        console.error(error);
    }
}

async function redeemPoints() {
    const redeemAmount = document.getElementById('redeemAmount').value;
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    try {
        await contract.methods.redeemPoints(redeemAmount).send({ from: userAddress });
        updatePoints();
    } catch (error) {
        console.error(error);
    }
}

init();
