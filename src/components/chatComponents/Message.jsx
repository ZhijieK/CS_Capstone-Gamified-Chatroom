import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useSelector, useDispatch } from "react-redux";
import ChatMiniIcon from "./ChatMiniIcon";
import { doc, updateDoc } from "firebase/firestore";

import {
  earnedMoney,
} from "../../redux/features/userInfoSlice";
import { db } from "../../firebase";

const Message = ({
  message,
  userUid,
  chatProfile,
  isLastMessage,
  isQuiztime,
}) => {
  const answer = "answer";
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // console.log(chatProfile)
  const profileIcon = useSelector((state) => state.profileIcon);
  // console.log("Profile: ", profileIcon)
  const wallet = useSelector((state) => state.userInfo.wallet);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

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
    timeAgo =
      diffInMinutes + (diffInMinutes === 1 ? " minute ago" : " minutes ago");
  } else {
    timeAgo =
      diffInSeconds + (diffInSeconds === 1 ? " second ago" : " seconds ago");
  }
  
  const updateWalletInDB = async () => {
    try {
      // const userDocRef = doc(db, "users", currentUser.uid);
      // await updateDoc(userDocRef, { wallet });
      console.log("Wallet successfully updated in DB to:", wallet);
    } catch (error) {
      console.log("Failed to update wallet in DB:", error);
    }
  }

  const awardPlayer = (uid) => {
    if (uid === currentUser.uid){
      dispatch(earnedMoney(5));
      updateWalletInDB();
    }
  }

  useEffect(() => {
    if (isLastMessage && isQuiztime && message.text.toLowerCase() === answer) {
      awardPlayer(message.senderId);
    }
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid ? "owner" : ""
      }`}
    >
      <div className="messageInfo">
        <ChatMiniIcon
          profileProp={
            message.senderId === currentUser.uid ? profileIcon : chatProfile
          }
          isOwner={message.senderId === currentUser.uid ? true : false}
        />
        <span>{timeAgo}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* {message.img && <img src={message.img} alt="" />} */}
      </div>
        {
          isLastMessage & isQuiztime & message.text.toLowerCase() === answer ?
          <p > Answer correct! Price Awarded: 10 coins. </p>
          : isLastMessage & isQuiztime & message.text.toLowerCase() != answer ? <p> You answered incorrectly!</p> : <p></p> 
        }
    </div>
  );
};

export default Message;
