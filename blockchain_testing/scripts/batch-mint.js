require('dotenv').config();
const ethers = require('ethers');

const PIXELS_TO_MINT = 70;

const API_KEY = process.env.TESTNET_RPC;
const provider = new ethers.providers.JsonRpcProvider(API_KEY)

const contract = require("../artifacts/contracts/PinRIT.sol/PinRIT.json");

const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

const abi = contract.abi
const contractAddress = '0x54f2dd7c40c5012163F4423f7A84f13e1a14F30a'

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