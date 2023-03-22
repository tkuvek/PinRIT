require('dotenv').config();
const ethers = require('ethers');

const PIXELS_TO_MINT = 198;

const API_KEY = process.env.TESTNET_RPC;
const provider = new ethers.providers.JsonRpcProvider(API_KEY)

const contract = require("../artifacts/contracts/PinRIT.sol/PinRIT.json");

const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

const abi = contract.abi
const contractAddress = '0x53734b36FE7E9f35FD15c7BE1ccA054E9bFaEb3E'

const myNftContract = new ethers.Contract(contractAddress, abi, signer)

const mintNFT = async () => {
    for (let index = 0; index < PIXELS_TO_MINT; index++) {
        let nftTxn = await myNftContract.mint()
        await nftTxn.wait()

        console.log("minted pixel" + index);
    }
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });