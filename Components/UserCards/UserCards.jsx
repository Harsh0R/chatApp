import React from "react";
import Image from "next/image";

// internal import
import Style from "./userCards.module.css";
import images from "../../assets/index";

const UserCards = ({ el, i, addFriends }) => {
  console.log(el);
  return (
    <div className={Style.userCards}>
      <div className={Style.userCards_box}>
        <Image
          className={Style.userCards_box_img}
          src={images[`image${i + 1}`]}
          alt="users"
          width={100}
          height={100}
        />
        <div className={Style.userCards_box_imfo}>
          <h3> {el.name} </h3>
          <p> {el.acountAddress.slice(0, 25)}... </p>
          <button
            onClick={() => {
              addFriends({ name: el.name, accountAddress: el.acountAddress });
            }}
            >
            Add Friends
          </button>
        </div>
      </div>
      <small className={Style.number}>{i+1}</small>
    </div>
  );
};

export default UserCards;
