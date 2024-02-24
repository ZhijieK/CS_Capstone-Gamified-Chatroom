import React from 'react'
import Add from './images/Add.png'
import Options from './images/Options.png'
import Messages from './Messages'
import Input from "./Input"

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Kinji</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src={Options} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat