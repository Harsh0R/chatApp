import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Style from "./Chat.module.css";
import images from "../../../assets";
import { convertTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  console.log(
    "Chat name = " + chatData.name + " Chat Address = " + chatData.address + " msg = " + message
  );
  console.log(
    "Chat curr name = " + currentUserName + " Chat Address = " + currentUserAddress + " msg = " + message
  );

  return (
    <div className={Style.Chat}>
      {currentUserAddress && currentUserName ? (
        <div className={Style.Chat_use_info}>
          <Image
            src={images.accountName}
            alt="user Image"
            width={70}
            height={70}
          />
          <div className={Style.Chat_use_info_box}>
            <h4>{currentUserName}</h4>
            {/* <h4>{chatData.name}</h4> */}
            <p className={Style.show}> {currentUserAddress} </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsg.map((el, i) => (
              <div>
                {" "}
                {el.sender == chatData.address ? (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {" "}
                      {chatData.name}
                      {" "}
                      <small> Time: {convertTime(el.timestamp)} </small>{" "}
                    </span>
                  </div>
                ) : (
                  <div className={Style.Chat_box_left_title}>
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {" "}
                      {userName}
                      {" "}
                      <small> Time: {convertTime(el.timestamp)} </small>{" "}
                    </span>
                  </div>
                )}{" "}
                <p key={i + 1}>
                  {" "}
                  {el.msg}
                  {""}
                  {""}{" "}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserAddress && currentUserName ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image
                src={images.smile}
                alt="smile img"
                width={50}
                height={50}
              />
              <input
                type="text"
                placeholder="type you message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() =>
                    functionName({ msg: message, address: currentUserAddress })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
