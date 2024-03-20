import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)
  
  const ref = useRef()

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid ? 'owner' : ''}`}>
      <div className="messageInfo">
        <img src= {message.senderId === currentUser.uid ? "https://i.kym-cdn.com/entries/icons/facebook/000/048/516/Screenshot_2024-02-20_at_10.43.43_AM.jpg" : "https://i.kym-cdn.com/photos/images/newsfeed/002/738/958/9e9"} alt="" />
        <span>now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=""/>}
      </div>
    </div>
  );
};

export default Message