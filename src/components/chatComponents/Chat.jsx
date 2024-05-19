import React, { useContext, useState, useEffect } from 'react';
import Add from '../images/generalIcons/Add.png';
import options from '../images/generalIcons/Options.png';
import person from '../images/generalIcons/person.png';
import Messages from './Messages';
import Input from "./Input";
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase.js";
import Options from "./Options.jsx";
import OtherUserProfile from "../profileComponents/otherUserProfile.jsx";
import { current } from '@reduxjs/toolkit';

const Chat = () => {
  const { data } = useContext(ChatContext);
  
  const {currentUser} = useContext(AuthContext);
  const [info, setInfo] = useState([])
  const [info2, setInfo2] = useState([])
  const [notif, setNotif] = useState(false);
  const [popup, setPopup] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [request, setRequest] = useState(false);
  const [game, setGame] = useState(false);
  const [err,setErr] = useState(false);
  const [test, setTest] = useState();

  const [notifNum, setNotifNum] = useState();

  /* Handles the options dropdown menu */
  const toggleDropDown = () => {
    setDropDown(!dropDown)
  }

  /* Handles other user profile popup */
  const togglePopup = () => {
    setPopup(!popup)
  }

  /* Handles friend request confirmation popup */
  const toggleRequest = () => {
    setRequest(!request)
  }

  //Get snapshot of other user data
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
  }, []);

  //Handle giving the user money for # of messages sent
  const updateWallet = async ()=>{
    try{
      //Update user data
      await updateDoc(doc(db, "users", currentUser.uid), {
        messages_sent: 0,
        wallet: (info2.wallet + 25),
      })
      
      } catch(err){
        setErr(true);
        console.log(err);
      }
  }

  //Give user money for # of messages sent
  useEffect(()=>{
    setTest(info2.messages_sent);

    if(test > 4){
      updateWallet();
      setTest(0);
    }

  }, [info2]);

  //Handles Notifications
  useEffect(()=>{
    const getInfo2 = ()=>{
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setInfo2(doc.data());
        //Find # of friend requests
        const array = info2.requests || [];
        const size = array.length;
        setNotifNum(size);
        //show notifications if you have any
        if(size > 0){
          setNotif(true);
        }
        else{
          setNotif(false);
        }
      });
  
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInfo2()
  }, []);

  /* Send a friend request */
  const handleRequest = async () => {

    try{
      //Update user data
      await updateDoc(doc(db, "users", data.user?.uid), {
          requests: arrayUnion(currentUser.uid),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
      } 
  }

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{info.displayName}</span>
        <p> {}</p>
        <div className="chatIcons">
          <img src={person} alt="" onClick={togglePopup} />
          <img src={Add} alt="" onClick={toggleRequest} />
          <img src={options} alt="" onClick={toggleDropDown} />
          {notif && <div className="notif">
            <p>{notifNum}</p>
          </div>}
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

      {/* Add friend popup */}
      {
        request && 
        <div className="popup">
          <div className="overlay2" onClick={toggleRequest}>
            <div className="request">
              <p>Would you like to add {info.displayName} as a friend?</p>
              <div className="buttons">
                <div className="button" onClick={handleRequest} > Yes </div>
                <div className="button2" onClick={toggleRequest} > No </div>
              </div>
            </div>
          </div>
        </div>
      }

      <Messages />
      <Input/>
    </div>
  )
}

export default Chat