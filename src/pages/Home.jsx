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
  setProfileIcon,
} from "../redux/features/profileIconSlice.js";
import { currentMoney, setDisplayName, updateInventory } from '../redux/features/userInfoSlice.js'
import { setUid } from '../redux/features/userUidSlice.js'
import { useEffect, useState } from 'react'


const Home = () => {
  //get current user and set that uid in my reducer
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  // //dispatch to set up current uid
  dispatch(setUid(currentUser.uid));
  const UserUid = useSelector((state) => state.userUID.uid)
  const profileIcon = useSelector((state) => state.profileIcon);
  console.log(profileIcon)


  useEffect(() => {
    let unsubscribe;
    const fetchData = async () => {
      try {

        const userDataRef = doc(db, "users", UserUid);
        const userDataSnap = await getDoc(userDataRef);
        console.log(userDataSnap.data())
        const userData = userDataSnap.data();
        console.log(userData)
        //sets the user display name in redux
        //display name
        dispatch(setDisplayName(userData.displayName))
        //inventory
        dispatch(updateInventory(userData.inventory)) 
        //wallet
        dispatch(currentMoney(userData.wallet))
        console.log(userData)

  
        // Batch Firestore reads
        const docRefs = Object.values(userData.profileIcon).map(itemId =>
          doc(db, "shopItems", itemId)
        );
        const docsSnap = await Promise.all(docRefs.map(docRef => getDoc(docRef)));
        const profileUpdates = {};
        const urlPromises = [];

        docsSnap.forEach((docSnap, index) => {
          const itemData = docSnap.data();
          const category = Object.keys(userData.profileIcon)[index];
          profileUpdates[category] = itemData.itemName;

          const urlPromise = getDownloadURL(ref(storage, itemData.imageRef)).then(url => {
            profileUpdates[`${category}Link`] = url
          });
          urlPromises.push(urlPromise);
        });

        await Promise.all(urlPromises);
        dispatch(setProfileIcon(profileUpdates))
      } catch (error) {
        console.log("Could not fetch user data", error);
      }
    };
    fetchData();
    return unsubscribe;
  }, [UserUid, dispatch]);


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