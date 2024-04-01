import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import edit from "../images/generalIcons/edit.png";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  setSkin,
  setHair,
  setEyes,
  setMouth,
  setClothes,
} from "../../redux/features/profileIconSlice.js";

import tempIcon from "../images/generalIcons/User.png";

import '../cssFile/profile.css'
import skin from '../images/characterAssets/skin/skin1.png';
import hair from '../images/characterAssets/hair/black_short_hair.png';
import eyes from '../images/characterAssets/eyes/brown_eyes.png';
import mouth from '../images/characterAssets/mouth/smile.png';
import shirt from '../images/characterAssets/clothes/suit.png';


const Avatar = () => {
  const [info, setInfo] = useState([])
  const { currentUser } = useContext(AuthContext);
  const profileIcon = useSelector((state) => state.profileIcon); 

  useEffect(() => {
    //everytime profile icon changes, update the db
  }, [profileIcon]);

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
    <div className="container">
      {" "}
      {/*Grey box on left side*/}
      <div className="bar">
        <Link to="../" style={{ color: "black" }}>
          {" "}
          <div className="button"> Go Back </div>{" "}
        </Link>
        <p style={{ fontSize: 35, padding: 20 }}>Profile</p>
        <Link to="../profile_edit" style={{color: 'black'}}> <div className="button2"><img src={edit} /></div> </Link>
      </div>
      {/*The Avatar*/}
      <div className="circle">
      {["skin", "hair", "eyes", "mouth", "clothes"].map((category) => (
          <img
            key={category}
            className="avatar-image"
            data-category={category}
            src={profileIcon[`${category}Link`] || {tempIcon}}
            alt={category}
          />
        ))}
      </div>
      {/*The Bio*/}
      <div className="bio">
                  <p style={{fontSize: 25, padding: 5}}>{info.displayName}</p>
                  <p style={{fontSize: 20, padding: 5}}>Bio: {info.bio}</p>
                  <p style={{fontSize: 20, padding: 5}}>Gender: {info.gender}</p>
                </div>
                <div className="stats">
                  <p style={{fontSize: 20}}>Friends: 12</p>
                  <p style={{fontSize:20,padding:10}}>Gold: {info.wallet}</p>
                </div>
            </div>
  );
};

export default Avatar;
