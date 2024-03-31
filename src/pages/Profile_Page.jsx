//import React from 'react';
import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../components/profileComponents/Avatar.jsx";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
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
import {
  setSkin,
  setHair,
  setEyes,
  setMouth,
  setClothes,
} from "../redux/features/profileIconSlice.js";

import "../components/cssFile/profile.css";
import { updateInventory } from "../redux/features/userInfoSlice.js";

const Profile = () => {
  // const [userInfo, setUserInfo] = useState([]);
  //gets all the data of the items
  let urlPage = useParams();
  const [inventoryItems, setInventoryItems] = useState([]);

  //states that'll render on the page
  const [inventoryBox, setInventoryBox] = useState([]);
  const dispatch = useDispatch();
  const arrayOfOwnedItems = useSelector((state) => state.userInfo.inventory);
  const profileIcon = useSelector((state) => state.profileIcon);
  console.log(arrayOfOwnedItems);

  //click to try on outfit
  let handleItemSelection = (clickedItem) => {
    // console.log(clickedItem)
    switch (clickedItem.itemCategory) {
      case "hair":
        dispatch(setHair(clickedItem.imageRef));
        break;
      case "skin":
        dispatch(setSkin(clickedItem.imageRef));
        break;
      case "eyes":
        dispatch(setEyes(clickedItem.imageRef));
        break;
      case "mouth":
        dispatch(setMouth(clickedItem.imageRef));
        break;
      case "clothes":
        dispatch(setClothes(clickedItem.imageRef));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getInventoryItemData = async () => {
      const itemSnapshot = await getDocs(query(collection(db, "shopItems")));
      const promises = itemSnapshot.docs
        .filter((doc) => arrayOfOwnedItems.includes(doc.data().itemName.trim()))
        .map(async (doc) => {
          const url = await getDownloadURL(ref(storage, doc.data().imageRef));
          return {
            cost: doc.data().cost,
            imageRef: url,
            itemCategory: doc.data().itemCategory,
            itemName: doc.data().itemName,
          };
        });
  
      const allItems = await Promise.all(promises);
      setInventoryItems(allItems);
  
      // Move this logic inside the getInventoryItemData function
      const inventoryBox = allItems.map((item) => {
        return (
          <div className="itemInvCard" key={item.itemName}>
            <div
              className="invItem"
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setInventoryBox(inventoryBox);
    };
      getInventoryItemData();
  }, [arrayOfOwnedItems]); // Add arrayOfOwnedItems as a dependency  

  useEffect(() =>{
    // const updateProfileIcondInDB = () =>{

    // }

    console.log("profile Icon: ", profileIcon)
  }, [profileIcon])

  return (
    <div className="profile">
      <Avatar />

      <div className="container2"> 
        {/*right side*/}
        <h1>Inventory</h1>
        {/* <h1 style={{padding:"10px"}}>Buy more in the shop!</h1> */}
        <Link to="../shop_page" style={{ color: "black" }}>
          {" "}
          <div className="button"> Shop </div>{" "}
        </Link>
        <div className="itemContainer" id="hair">
          {inventoryBox}
        </div>
      </div>
    </div>
  );
};

export default Profile;
