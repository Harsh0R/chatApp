// import { BrowserProvider, ethers } from "ethers";
import Web3 from "web3";
import Web3Modal from "web3modal";
const { ethers } = require("ethers");
// const Web3 = require('web3');

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      return console.log("INSTALL METAMASk");
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      return console.log("INSTALL METAMASk");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    // const web3 = new Web3(new Web3.providers.HttpProvider(
    //   'https://goerli.infura.io/v3/aebfb59d230b4e9c8c67a3d4a36f4964'
    // ));
    // const web3 = new Web3(
    //   "https://goerli.infura.io/v3/aebfb59d230b4e9c8c67a3d4a36f4964"
    // );
    // const signer = web3.eth.accounts.privateKeyToAccount(
    //   process.env.SIGNER_PRIVATE_KEY,
    // );
    // web3.eth.accounts.wallet.add(signer);
    // const web3 = new Web3(window.ethereum);
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.JsonRpcProvider(
    //   `https://goerli.infura.io/v3/aebfb59d230b4e9c8c67a3d4a36f4964`
    // );
    const chainId = await provider
      .getNetwork()
      .then((network) => network.chainId);
    console.log("ChainId:", chainId);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

//   export const Wallet = async()=>{

//   const web3modal = new Web3Modal();
//   const connection = await web3modal.connect();
//   const provider = new ethers.providers.Web3Provider(connection);
//   const privateKey = "ea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0"
//   const wallet = new ethers.Wallet(privateKey, provider);
//   return wallet;
// }

// export const convertTime = (time) => {
//   const newTime = new Date(time.toNumber());
//   const realTime = newTime.getHours() + "/";
//   newTime.getMinutes() + "/";
//   newTime.getSeconds() + " Date: ";
//   newTime.getDate() + "/"(newTime.getMonth() + 1) + "/";
//   newTime.getFullYear();

//   return realTime;
// };

export const convertTime = (time) => {
  const newTime = new Date(time.toNumber());
  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date: " +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

  return realTime;
};
