import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useSelector, useDispatch } from 'react-redux';
import ChatMiniIcon from './ChatMiniIcon';

const Message = ({message, userUid, chatProfile}) => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  // console.log(chatProfile)
  const profileIcon = useSelector((state) => state.profileIcon);
  // console.log("Profile: ", profileIcon)
  
  const ref = useRef()

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])

  const messageDate = message.date.toDate();
  const now = new Date();

  const diffInMilliseconds = now - messageDate;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  let timeAgo;
  if (diffInDays > 0) {
    timeAgo = diffInDays + (diffInDays === 1 ? " day ago" : " days ago");
  } else if (diffInHours > 0) {
    timeAgo = diffInHours + (diffInHours === 1 ? " hour ago" : " hours ago");
  } else if (diffInMinutes > 0) {
    timeAgo = diffInMinutes + (diffInMinutes === 1 ? " minute ago" : " minutes ago");
  } else {
    timeAgo = diffInSeconds + (diffInSeconds === 1 ? " second ago" : " seconds ago");
  }

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid ? 'owner' : ''}`}>
      <div className="messageInfo">
        {/* <img src= {message.senderId === currentUser.uid ? "https://i.kym-cdn.com/entries/icons/facebook/000/048/516/Screenshot_2024-02-20_at_10.43.43_AM.jpg" : "https://i.kym-cdn.com/photos/images/newsfeed/002/738/958/9e9"} alt="" /> */}
        <ChatMiniIcon profileProp={message.senderId === currentUser.uid ? profileIcon : chatProfile} isOwner={message.senderId === currentUser.uid ? true: false}/>
        <span>{timeAgo}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=""/>}
      </div>
    </div>
  );
};

export default Message