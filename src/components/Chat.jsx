import React from 'react'
import Add from './images/Add.png'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Kinji</span>
        <div className="chatIcons">
          <img src={Add} alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Chat