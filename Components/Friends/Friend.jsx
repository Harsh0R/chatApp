import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./friend.module.css";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatAppContext } from "../../Context/ChatAppContext";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    friendMsg,
    readUser,
    readMessage,
    userName,
    addFriends,
    loading,
    currentUserName,
    currentUserAddress,
  } = useContext(ChatAppContext);
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
          />
        </div>
      </div>
      
    </div>
  );
};

export default Friend;
