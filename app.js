// Contract ABI
const stakingContractABI = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_wizbisywebToken",
                "type": "address"
            },
            {
                "internalType": "contract DWeb",
                "name": "_dwebToken",
                "type": "address"
            }
        ],
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
            }
        ],
        "name": "TokensClaimed",
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
        "name": "TokensStaked",
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
        "name": "TokensUnstaked",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "APR",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MAX_CLAIM",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SECONDS_IN_MONTH",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dwebToken",
        "outputs": [
            {
                "internalType": "contract DWeb",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastClaimTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "stakeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakedBalances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakingStartTimes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "unstakeTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "wizbisywebToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract Address
const stakingContractAddress = '0x5593e2C04E4c8136274DC690Ba233A81d23dB18e'; // Replace with your contract address

// Monad Testnet Chain Details
const monadChainId = '0x279F'; // Replace with the actual Monad Testnet Chain ID (in hexadecimal)
const monadChainName = 'Monad Testnet';
const monadRpcUrl = 'https://testnet-rpc.monad.xyz'; // Monad Testnet RPC URL
const monadCurrencySymbol = 'MONAD'; // Replace with the actual currency symbol for Monad Testnet
const monadBlockExplorerUrl = 'https://testnet-explorer.monad.xyz'; // Replace with the actual block explorer URL for Monad Testnet

// Function to switch to Monad Testnet
async function switchToMonadTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: monadChainId,
                chainName: monadChainName,
                nativeCurrency: {
                    name: monadCurrencySymbol,
                    symbol: monadCurrencySymbol,
                    decimals: 18,
                },
                rpcUrls: [monadRpcUrl],
                blockExplorerUrls: [monadBlockExplorerUrl],
            }],
        });
        return true;
    } catch (error) {
        console.error("Error switching to Monad Testnet:", error);
        return false;
    }
}

// Connect to Monad Chain (MetaMask)
let provider, signer, stakingContract;

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // Check if the correct chain (Monad Testnet) is connected
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            if (chainId !== monadChainId) {
                // Prompt the user to switch to the Monad Testnet
                const switched = await switchToMonadTestnet();
                if (!switched) {
                    alert('Failed to switch to the Monad Testnet. Please switch manually in MetaMask.');
                    return;
                }
            }

            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                // Initialize ethers.js provider and signer
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                stakingContract = new ethers.Contract(stakingContractAddress, stakingContractABI, signer);

                // Display connected wallet address
                const walletAddress = await signer.getAddress();
                document.getElementById('walletAddress').textContent = walletAddress;
                document.getElementById('walletInfo').style.display = 'block';
            } else {
                alert('No accounts found. Please unlock MetaMask.');
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert('Failed to connect wallet. Check the console for details.');
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Stake Tokens
document.getElementById('stakeTokens').addEventListener('click', async () => {
    const amount = document.getElementById('stakeAmount').value;
    if (amount > 0) {
        try {
            console.log("Staking tokens...");
            const tx = await stakingContract.stakeTokens(ethers.utils.parseEther(amount));
            await tx.wait();
            alert('Tokens staked successfully!');
        } catch (error) {
            console.error("Error staking tokens:", error);
            alert('Staking failed. Check the console for details.');
        }
    } else {
        alert('Please enter a valid amount.');
    }
});

// Unstake Tokens
document.getElementById('unstakeTokens').addEventListener('click', async () => {
    try {
        console.log("Unstaking tokens...");
        const tx = await stakingContract.unstakeTokens();
        await tx.wait();
        alert('Tokens unstaked successfully!');
    } catch (error) {
        console.error("Error unstaking tokens:", error);
        alert('Unstaking failed. Check the console for details.');
    }
});

// Claim Tokens (Faucet)
document.getElementById('claimTokens').addEventListener('click', async () => {
    try {
        console.log("Claiming tokens...");
        const tx = await stakingContract.claimTokens();
        await tx.wait();
        alert('Tokens claimed successfully!');
    } catch (error) {
        console.error("Error claiming tokens:", error);
        alert('Claiming tokens failed. Check the console for details.');
    }
});
