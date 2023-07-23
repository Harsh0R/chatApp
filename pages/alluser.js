import React, { useContext, useState, useEffect } from "react";

import { UseCards } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";

const alluser = () => {
  const { addFriends, userLists } = useContext(ChatAppContext);
  return (
    <div className={Style.alluser_info}>
      <h1 >
        Find Your Friend
      </h1>
      <div className={Style.alluser}>
        {userLists.map((el,i) => (
            <UseCards key={i+1} el={el} i={i} addFriends={addFriends}/>
        ))}

      </div>
    </div>
  );
};

export default alluser;
