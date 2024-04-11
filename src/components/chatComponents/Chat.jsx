import React, { useContext, useState, useEffect } from 'react';
import Add from '../images/generalIcons/Add.png';
import options from '../images/generalIcons/Options.png';
import person from '../images/generalIcons/person.png';
import Messages from './Messages';
import Input from "./Input";
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";
import Options from "./Options.jsx";
import OtherUserProfile from "../profileComponents/otherUserProfile.jsx";

const Chat = () => {
  const { data } = useContext(ChatContext);
  
  const [info, setInfo] = useState([])
  const [popup, setPopup] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown)
  }

  const togglePopup = () => {
    setPopup(!popup)
  }

  //Get snapshot of user data
  useEffect(()=>{
    const getInfo = ()=>{
      const unsub = onSnapshot(doc(db, "users", data.user?.uid), (doc) => {
        setInfo(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
    data.user?.uid && getInfo()
  });

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{info.displayName}</span>
        <p> {}</p>
        <div className="chatIcons">
          <img src={person} alt="" onClick={togglePopup} />
          <img src={Add} alt="" />
          <img src={options} alt="" onClick={toggleDropDown} />
          {/* Options drop down menu */}
          {
            dropDown && <Options />
          }
        </div>
      </div>

      {/* Other user profile popup */}
      {
        popup && <OtherUserProfile info={info} /> 
      }
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat