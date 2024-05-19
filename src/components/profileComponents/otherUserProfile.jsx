import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import ChatMiniIcon from '../chatComponents/ChatMiniIcon';
import Icon from '../chatComponents/Icon';

import skin from '../images/characterAssets/skin/skin3.png';
import hair from '../images/characterAssets/hair/black_short_hair.png';
import eyes from '../images/characterAssets/eyes/brown_eyes.png';
import mouth from '../images/characterAssets/mouth/smile.png';
import shirt from '../images/characterAssets/clothes/red_shirt.png';

const otherUserProfile = (props) => {
    const info = props.info;
    const [friends, setFriends] = useState();

    useEffect(()=>{
      //Finds # of friends
      const array = info.friends || [];
      const size = array.length;
      setFriends(size);
    });

    return (
        <div className="popup">
        <div className="overlay">
          <div className="profile">
          <div className="container">
              <div className="bar">
              <Link to="../" style={{ color: "black" }}>
                  <div className="button"> Close </div>{" "}
              </Link>
              <p style={{ fontSize: 35, padding: 20 }}>Profile</p>
              </div>
              {/*The Avatar*/}
              <div className="circle">
              <Icon uid = {info.uid}/>
              </div>
              {/*The Bio*/}
              <div className="bio">
                  <p style={{fontSize: 25, padding: 5}}> {info.displayName} </p>
                  <p style={{fontSize: 20, padding: 5}}>Bio: {info.bio} </p>
                  <p style={{fontSize: 20, padding: 5}}>Gender: {info.gender} </p>
              </div>
              <div className="stats">
                  <p style={{fontSize: 20}}>Friends: {friends}</p>
                  <p style={{fontSize:20,padding:10}}>Gold: {info.wallet}</p>
              </div>
          </div>
          </div>
        </div>
      </div>
    )
}

export default otherUserProfile;