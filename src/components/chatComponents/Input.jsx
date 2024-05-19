import React, { useContext, useState, useEffect } from 'react'
import File from '../images/generalIcons/File.png'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { v4 as uuid } from 'uuid'
import trivia from '../images/generalIcons/trivia.png'
import Name from './Name.jsx'
import { current } from '@reduxjs/toolkit'

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [game, setGame] = useState(false);
  const [game2, setGame2] = useState(false);
  const [info, setInfo] = useState([]);

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const getInfo = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setInfo(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInfo();
  }, [currentUser.uid]);

//Handles sending the message
const handleSend = async ()=>{
  if (text !== "") {
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "users", currentUser.uid), {
      messages_sent: (info.messages_sent + 1),
    });

    setText("")
    setImg(null)
  }
};

  /* Handles trivia invite confirmation popup */
  const toggleTrivia = () => {
    setGame(!game)
  }

  /* handles sending trivia invite */
  const handleInvite = async () => {

    setGame(!game)
    try{
      //Update user data
      await updateDoc(doc(db, "users", data.user?.uid), {  
        game_request: arrayUnion(currentUser.uid),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
      } 
  }

  /* Check if the person you're chatting with has invited you to a game */
  useEffect(()=>{
    const array = info.game_request || [];

    if(array[0] == data.user?.uid && !game && array[0] != null){
      setGame2(true)
    }
  }, [data.user]);

  /* Handle declining game invite */
  const handleDecline = async (e) => {

    try{
      /* Remove the persons uid from your game_request list */
      await updateDoc(doc(db, "users", currentUser.uid), {
          game_request: arrayRemove(e),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
      } 
  }

  const handleGame = () => {
    /* Start the game */
  }

  return (
    <div className='input'>
      <input type="text" placeholder='Type your message...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={trivia} onClick={toggleTrivia}/>
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img className='addFile' src={File} alt=''/>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>

      {/* Add friend popup */}
      {
        game && 
        <div className="popup">
          <div className="overlay2">
            <div className="request">
              <p>Would you like to invite {<Name id={data.user?.uid} />} to a game of trivia?</p>
              <div className="buttons">
                <div className="button" onClick={handleInvite} > Yes </div>
                <div className="button2" onClick={toggleTrivia} > No </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Add game invite popup */}
      {
        game2 && 
        <div className="popup">
          <div className="overlay2" onClick={toggleGame}>
            <div className="request">
              <p>{data.user.displayName} has invited you to a game of trivia, would you like to accept?</p>
              <div className="buttons">
                <div className="button" onClick={() => handleGame} > Yes </div>
                <div className="button2" onClick={() => handleDecline(data.user.uid)} > No </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Input