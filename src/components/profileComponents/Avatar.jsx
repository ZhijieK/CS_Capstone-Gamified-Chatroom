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


const Avatar = () => {
  const [info, setInfo] = useState([])
  const { currentUser } = useContext(AuthContext);
  const [currentProfile, setCurrentProfile] = useState({
    skin: tempIcon,
    hair: tempIcon,
    eyes: tempIcon,
    mouth: tempIcon,
    clothes: tempIcon,
  });
  const profileIcon = useSelector((state) => state.profileIcon); 

  useEffect(() => {
    setCurrentProfile({
      skin: profileIcon.skin,
      hair: profileIcon.hair,
      eyes: profileIcon.eyes,
      mouth: profileIcon.mouth,
      clothes: profileIcon.clothes,
    });
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
        {Object.keys(currentProfile).map((category) => (
          <img
            key={category}
            className="avatar-image"
            data-category={category}
            src={currentProfile[category]}
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
