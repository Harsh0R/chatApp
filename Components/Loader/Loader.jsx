import React from 'react'
import Image from 'next/image'

// internal import 
import Style from "./loader.module.css"
import images from "../../assets/index"


const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt='loadding...' width={100} height={100}/>
      </div>
    </div>
  )
}

export default Loader
