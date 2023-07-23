import React from 'react'

import { ChatAppContext } from '../Context/ChatAppContext'
import { Filter , Friends } from '../Components/index'

const Chatapp = () => {
  return (
    <div>
      <Filter/>
      <Friends/>
    </div>
  )
}

export default Chatapp
