"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";

// Internal import
import Style from "./Navbar.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";

function Navbar() {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
    },
    {
      menu: "CHATS",
      link: "/",
    },
    {
      menu: "CONTECTS",
      link: "/",
    },
    {
      menu: "SETTING",
      link: "/",
    },
    {
      menu: "FAQs",
      link: "/",
    },
    {
      menu: "TERMS OF USE",
      link: "/",
    },
  ];

  // usestate
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } =
    useContext(ChatAppContext);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={images.logo} alt="Logo" width={50} height={50}></Image>
        </div>

        <div className={Style.Navbar_box_right}>
          {/* Desctop */}
          <div className={Style.Navbar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.Navbar_box_right_menu_item} ${
                  active == i + 1 ? Style.active_btn : Style.inactive_btn
                }`}
              >
                <Link
                  className={Style.Navbar_box_right_menu_item_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${
                    active === i + 1 ? Style.active_btn : Style.inactive_btn
                  }`}
                >
                  <Link className={Style.mobile_menu_item_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="Close"
                  width={50}
                  height={50}
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </p>
            </div>
          )}

          {/* Connect Wallet */}
          <div className={Style.Navbar_box_right_connect}>
            {account == "111" ? (
              <button onClick={() => connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="account Image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.Navbar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* model Component */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="Wellcom to "
            head="Chat Buddy..😎👋"
            info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex laudantium voluptatem aliquid eos maxime maiores corrupti numquam, modi suscipit rem!sma"
            samllInfo="Kindly select your name........"
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error}/>}
      {/* {error} */}
    </div>
  );
}

export default Navbar;
