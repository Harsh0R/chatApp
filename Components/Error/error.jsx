import React from 'react'

import Style from "./error.module.css"
import { ChatAppContext } from "../../Context/ChatAppContext";

const error = ({error}) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please Fix this Error & Reload Browser!!..😥</h1>
        {error}
      </div>
    </div>
  )
}

export default error
