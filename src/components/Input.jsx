import React from 'react'
import File from './images/File.png'

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type your message...'/>
      <div className="send">
        <input type="file" style={{display:"none"}} id="file"/>
        <label htmlFor="file">
          <img className='addFile' src={File} alt=''/>
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input