import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { getDownloadURL, ref } from "firebase/storage";

import ChatPanel from "./ChatPanel";


const Chats = () => {
  const [chats, setChats] = useState([]);
  const [chatProfiles, setChatProfiles] = useState({});
  // console.log(chatProfiles["Ytraq2tkQ8PajFBj0s9cH7GPnQK2"].eyesLink)

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([uid, chat]) => (
          <ChatPanel chatUid={uid} chat={chat} />
        ))}
    </div>
    
  );
};

export default Chats;
