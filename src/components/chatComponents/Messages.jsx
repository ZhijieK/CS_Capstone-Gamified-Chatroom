import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref } from 'firebase/storage'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext); 
  const quizTime = true

  console.log(data.user.uid)
  const uid = data.user.uid; 

  const [chatProfiles, setChatProfiles] = useState([]);

  useEffect(() => {
    const fetchChatProfiles = async () => {
      const profiles = {};
      console.log(uid)
      const userDataRef = await getDoc(doc(db, "users", uid)); 
      const userData = userDataRef.data();
      console.log(userData); 

      const docRefs = Object.values(userData.profileIcon).map((itemId) =>
        doc(db, "shopItems", itemId)
      );

      const docSnapshots = await Promise.all(
        docRefs.map((docRef) => getDoc(docRef))
      );

      const shopItemsData = docSnapshots.map((docSnapshot) =>
        docSnapshot.data()
      );
      console.log(shopItemsData);
      let profileUpdates = {};
      for (const docSnap of docSnapshots) {
        const itemData = docSnap.data(); 
        console.log(itemData)
        const category = itemData.itemCategory;
        if (category) {
          const url = await getDownloadURL(ref(storage, itemData.imageRef));
          console.log(url)
          profileUpdates[`${category}Link`] = url;
          profileUpdates[`${category}`] = itemData.itemName;
        }
      }
      // console.log(profileUpdates)
      setChatProfiles(profileUpdates);
      // console.log(chatProfiles);
    };
    fetchChatProfiles();
    console.log(chatProfiles.hairLink);
  }, [data]);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub()
    }
  }, [data.chatId])

  console.log(messages);

  return (
    <div className='messages'>
      {messages.map((m, index)=>(
        <Message message={m} key={m.id} userUid={data.user.uid} chatProfile={chatProfiles} isLastMessage={index === messages.length - 1} isQuiztime = {quizTime}/>
      ))}
    </div>


  )
}

export default Messages