import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import filler from "../images/generalIcons/filler.png"; /* Transparant img, placeholder for avatar before creation */
import edit from "../images/generalIcons/edit.png";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

import tempIcon from "../images/generalIcons/User.png";

const Avatar = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentProfile, setCurrentProfile] = useState({
    skin: tempIcon,
    hair: tempIcon,
    eyes: tempIcon,
    mouth: tempIcon,
    clothes: tempIcon,
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDoc(doc(db, "users", currentUser.uid));
        console.log("successfully got user data: ", userData.data())
        setUserInfo(userData.data());
        console.log("updated userInfo: ", userInfo)

        const promises = Object.values(userData.data().profileIcon).map(async (itemId) => {
          const itemRef = await getDoc(doc(db, "shopItems", itemId));
          const url = await getDownloadURL(ref(storage, itemRef.data().imageRef));
          return { [itemRef.data().itemCategory]: url };
        });
        const updatedProfile = await Promise.all(promises);
        setCurrentProfile((prevProfile) => ({
          ...prevProfile,
          ...Object.assign({}, ...updatedProfile),
        }));
        console.log("updated profile with links: ", currentProfile)
      } catch (error) {
        console.log("Could not fetch user data", error);
      }
    };
    fetchData();
  }, []);

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
        <div className="button2">
          <img src={edit} />
        </div>
      </div>
      {/*The Avatar*/}
      <div className="circle">
        {/* <div className="charaTryOnView">
          
        </div> */}
        {Object.keys(currentProfile).map((category) => (
          <img key={category} className="avatar-image" data-category={category} src={currentProfile[category]} alt={category} />
        ))}
      </div>
      {/*The Bio*/}
      <div className="bio">
        <p style={{ fontSize: 25, padding: 10 }}>{currentUser.displayName}</p>
        <p style={{ fontSize: 20 }}>Bio: I'm cool</p>
      </div>
      <div className="stats">
        <p style={{ fontSize: 20 }}>Age: 23</p>
        <p style={{ fontSize: 20 }}>Friends: 12</p>
        <p style={{ fontSize: 25, padding: 10 }}>Gold: 100</p>
        <p style={{ fontSize: 25 }}>Level 2: 300/500 xp</p>
      </div>
    </div>
  );
};

export default Avatar;
