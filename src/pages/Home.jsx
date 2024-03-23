import React from 'react'
import Sidebar from "../components/chatComponents/Sidebar"
import Chat from '../components/chatComponents/Chat'


//import packages
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {
  getDoc,
  doc,
  getDocs,
  query,
  collection,
  and,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import{
  setSkin,
  setHair,
  setEyes,
  setMouth,
  setClothes,
} from "../redux/features/profileIconSlice.js";
import { currentMoney, setDisplayName, updateInventory } from '../redux/features/userInfoSlice.js'
import { setUid } from '../redux/features/userUidSlice.js'
import { useEffect, useState } from 'react'
import tempIcon from "../components/images/generalIcons/User.png"


const Home = () => {
  //get current user and set that uid in my reducer
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid)
  const dispatch = useDispatch();

  // //dispatch to set up current uid
  dispatch(setUid(currentUser.uid));
  const UserUid = useSelector((state) => state.userUid.uid)
  console.log("UserUid: ", UserUid)

  //temperary profile holder
  const [currentProfile, setCurrentProfile] = useState({
    skin: tempIcon,
    hair: tempIcon,
    eyes: tempIcon,
    mouth: tempIcon,
    clothes: tempIcon,
  });
  const profileIcon = useSelector((state) => state.profileIcon);
  const allUserInfo = useSelector((state) => state.userInfo)


  useEffect(() => {
    const fetchData = async () => {
      try {
        //gets userinfo from db
        const userData = await getDoc(doc(db, "users", UserUid));
        console.log("successfully got user data: ", userData.data());
        //sets the user display name in redux
        //display name
        dispatch(setDisplayName(userData.data().displayName))
        // console.log("invent:", userData.data().inventory)
        //inventory
        dispatch(updateInventory(userData.data().inventory)) 
        //wallet
        dispatch(currentMoney(userData.data().wallet))
        //exp 
        //level
        //console.log checkpoint
        console.log("user Display Name: ", allUserInfo)
  
        const promises = Object.values(userData.data().profileIcon).map(
          async (itemId) => {
            const itemRef = await getDoc(doc(db, "shopItems", itemId));
            const url = await getDownloadURL(
              ref(storage, itemRef.data().imageRef)
            );
            return { [itemRef.data().itemCategory]: url };
          }
        );
        const updatedProfile = await Promise.all(promises);
        console.log("updated profile: ", updatedProfile)
        const newProfile = {
          ...currentProfile,
          ...Object.assign({}, ...updatedProfile),
        };
        setCurrentProfile(newProfile);
  
        // Update Redux store with the fetched avatar information
        dispatch(setSkin(newProfile.skin));
        dispatch(setHair(newProfile.hair));
        dispatch(setEyes(newProfile.eyes));
        dispatch(setMouth(newProfile.mouth));
        dispatch(setClothes(newProfile.clothes));
  
        console.log("updated profile with links: ", newProfile);
        // console.log("Redux state:", profileIcon);
      } catch (error) {
        console.log("Could not fetch user data", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className='chatroom'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home