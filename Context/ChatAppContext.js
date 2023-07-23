"use client";
import React, { useState, useEffect } from "react";
// import useRouter from "next/router";
import { useRouter } from "next/navigation";
const { ethers } = require("ethers");
import {
  checkIfWalletConnected,
  connectWallet,
  // getContractInstance,
  Wallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  // const title = "Hey Welcome to BlockChain Chat App 👋";

  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // chat user data
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // Fatch data when page load
  const fetchData = async () => {
    try {
      // get contract
      const contract = await connectingWithContract();
      // get account
      const connectAccount = await connectWallet();
      setAccount(connectAccount);

      // get user name
      try {
        const contract = await connectingWithContract();
        console.log("Connect Account is HERE =" + connectAccount);
        const userName = await contract.getUserName(connectAccount);
        // console.log("User Name in  = " + userName);
        setUserName(userName);
      } catch (error) {
        console.log("Error in User Name = " + error);
      }

      // get my friend list
      try {
        const friendLists = await contract.getMyFriendList();
        setFriendLists(friendLists);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
      // const friendLists = await contract.getMyFriendList();
      // setFriendLists(friendLists);

      // get All App User List
      try {
        const userList = await contract.getAllAppUsers();
        setUserLists(userList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
      // const userList = await contract.getAllAppUsers();
      // setUserLists(userList);
    } catch (error) {
      setError("Plaese install and collect your wallet....😑");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // read message
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();

      // read message
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently you have no message.....😑");
    }
  };

  // create Account
  const createAccount = async ({ name }) => {
    try {
      // if (!name || !accountAddress) {
      //   return setError("Name or Account Address cannot be empty..🤦‍♀️🤦‍♂️");
      // }
      // console.log("This f is called " + name);

      // try {
      // } catch (error) {
      //   console.log("Erro for creating account is = " + error);
      // }
      const contract = await connectingWithContract();
      console.log(account);
      const getCreatedUser = await contract.createAccount(name);

      console.log("name = " + name);
      setLoading(true);
      // console.log("get Create user = " + getCreatedUser);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating account..😥 Plaese reload Brouse..🔃");
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress) {
        return setError("Name or Account Address cannot be empty..🤦‍♀️🤦‍♂️");
      }
      const contract = await connectingWithContract();
      const addMyFriends = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriends.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while add your friend..😥 try again..🔃");
    }
  };

  // send message to friend
  const sendMessage = async ({ msg, address }) => {
    try {
      // if (!msg || !address) {
      //   return setError("Please type your message..🤦‍♂️");
      // }
      const contract = await connectingWithContract();
      console.log("address = " + address + " message = " + msg);
      // try {
      // } catch (error) {
      //   console.log("Error = "+error)
      // }
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error!!😥 please reload and try again..🔃");
      console.log(error);
    }
  };




  // const { ethers } = require('ethers');

  // ... other code ...
  // const privateKey = "ea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0"
  // const wallet = new ethers.Wallet(privateKey, provider);  
  // const gasLimit = 200000; // Set your desired gas limit here
  // const gasPriceWei = ethers.utils.parseUnits('50', 'gwei'); // Set your desired gas price in Wei here (e.g., 50 Gwei)
  // const sendMessage = async ({ msg, address }) => {
  //   try {
  //     // ... other code ...
  //     const contract = await connectingWithContract();

  //     const transaction = {
  //       to: contract.address, // Assuming the contract instance is already connected and stored in 'contract' variable
  //       value: 0, // If the message function does not involve sending Ether, set value to 0
  //       data: contract.interface.encodeFunctionData('sendMessage', [address, msg]),
  //       gasLimit: ethers.BigNumber.from(gasLimit),
  //       gasPrice: gasPriceWei, // Set the gas price directly in Wei
  //     };

  //     const signedTransaction = await Wallet.signTransaction(transaction);
  //     const addMessage = await provider.sendTransaction(signedTransaction);

  //     // ... other code ...
  //   } catch (error) {
  //     console.log("Got error....... = ", error);
  //     // ... error handling ...
  //   }
  // };

  // read info
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUserName(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        createAccount,
        readMessage,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkIfWalletConnected,
        userName,
        account,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

// export default ChatAppProvider;
