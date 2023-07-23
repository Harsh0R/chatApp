import React, { useContext, useState } from "react";
import Image from "next/image";

// Internal Import
import Style from "./filter.module.css";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";
import images from "../../assets";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);

  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>



      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image
              src={images.search}
              alt="Search Image"
              width={20}
              height={20}
            />
            <input type="text" placeholder="Search...🔎" />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAT CHAT
          </button>
          <button
            onClick={() => {
              setAddFriend(true);
            }}
          >
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="Wellcom to "
            head="Chat Buddy..😎👋"
            info="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex laudantium voluptatem aliquid eos maxime maiores corrupti numquam, modi suscipit rem!sma"
            samllInfo="Kindly select your name........"
            image={images.hero}
            functionName={addFriends}
            address={account}
          />
        </div>
      )}

      
    </div>
  );
};

export default Filter;
