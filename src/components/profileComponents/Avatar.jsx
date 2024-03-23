import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { db } from '../../firebase'; 
import { doc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import filler from '../images/generalIcons/filler.png'; /* Transparant img, placeholder for avatar before creation */
import edit from '../images/generalIcons/edit.png';
import skin from '../images/characterAssets/skin/skin1.png';
import hair from '../images/characterAssets/hair/black_short_hair.png';
import eyes from '../images/characterAssets/eyes/brown_eyes.png';
import mouth from '../images/characterAssets/mouth/smile.png';
import shirt from '../images/characterAssets/clothes/suit.png';


const Avatar = () => {

  const [info, setInfo] = useState([])
  const {currentUser} = useContext(AuthContext);

  //Get snapshot of user data
  useEffect(()=>{
    const getInfo = ()=>{
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setInfo(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInfo()
  });

  return (
            <div className="container"> {/*Box on left side*/}
                <div className="bar">
                <Link to="../" style={{color: 'black'}}> <div className="button"> Go Back </div> </Link>
                <p style={{fontSize: 35,padding:20}}>Profile</p>
                <Link to="../profile_edit" style={{color: 'black'}}> <div className="button2"><img src={edit} /></div> </Link>
                </div>
                {/*The Avatar*/}
                <div className="circle"> 
                <img src={skin} id ='skin' />
                <img src={mouth} id ='mouth' />
                <img src={hair} id='hair' />
                <img src={eyes} id='eyes' />
                <img src={shirt} id='shirt' />
                </div>
                {/*Name and Bio*/}
                <div className="bio">
                  <p style={{fontSize: 25, padding: 10}}>{info.displayName}</p>
                  <p style={{fontSize: 20}}>Bio: {info.bio}</p>
                </div>
                {/* Gender + other info */}
                <div className="stats">
                  <p style={{fontSize: 20}}>Gender: {info.gender}</p>
                  <p style={{fontSize: 20,padding:10}}>Friends: 12</p>
                  <p style={{fontSize:25,padding:5}}>Gold: 100</p>
                  <p style={{fontSize:25}}>Level 2: 300/500 xp</p>
                </div>
            </div>
  )
}

export default Avatar