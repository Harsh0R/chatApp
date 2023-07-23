import React, { useState, useContext } from "react";
import Image from "next/image";

// internal import
import Style from "./model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../index";
const Model = ({
  openBox,
  title,
  head,
  info,
  address,
  samllInfo,
  image,
  functionName,
}) => {
  // UseState
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  // const { createAccount} =
  // useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_Box}>
        <div className={Style.Model_Box_left}>
          <Image src={image} alt="Buddy" width={700} height={700}></Image>
        </div>
        <div className={Style.Model_Box_right}>
          <h1>
            {title}
            <span>{head}</span>
          </h1>
          <p> {info} </p>
          <small> {samllInfo} </small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_Box_right_name}>
              <div className={Style.Model_Box_right_name_info}>
                <Image
                  src={images.username}
                  alt="useName"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className={Style.Model_Box_right_name_info}>
                <Image
                  src={images.account}
                  alt="useName"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder={address || "Enter Address"}
                  onChange={(e) => {
                    setAccountAddress(e.target.value);
                  }}
                />
              </div>

              <div className={Style.Model_Box_right_name_btn}>
                <button
                  onClick={() => {
                    console.log(name);
                    functionName({name});
                  }}
                >
                  {" "}
                  <Image
                    src={images.send}
                    alt="send"
                    width={30}
                    height={30}
                  />{" "}
                  Submit
                </button>
                <button
                  onClick={() => {
                    openBox(false);
                  }}
                >
                  {""}
                  <Image
                    src={images.close}
                    alt="clode"
                    width={30}
                    height={30}
                  />
                  {""}
                  Cancle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
