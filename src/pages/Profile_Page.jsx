//import React from 'react';
import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../components/profileComponents/Avatar.jsx";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import profileIcon, {
  setSkin,
  setHair,
  setEyes,
  setMouth,
  setClothes,
} from "../redux/features/profileIconSlice.js";

import "../components/cssFile/profile.css";

const Profile = () => {
  // const [userInfo, setUserInfo] = useState([]);
  //gets all the data of the items
  const [hairItems, setHairItems] = useState([]);
  const [skinItems, setSkinItems] = useState([]);
  const [eyesItems, setEyesItems] = useState([]);
  const [mouthItems, setMouthItems] = useState([]);
  const [clothesItems, setClothesItems] = useState([]);
  //states that'll render on the page
  const [hairBoxes, setHairBoxes] = useState([]);
  const [skinBoxes, setSkinBoxes] = useState([]);
  const [eyesBoxes, setEyesBoxes] = useState([]);
  const [mouthBoxes, setMouthsBoxes] = useState([]);
  const [clothesBoxes, setClothesBoxes] = useState([]);

  const dispatch = useDispatch();

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
      const userData = await getDoc(doc(db, "users", currentUser.uid));
      const arrayOfOwnedItems = Object.values(userData.data().inventory).flat();

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
      const itemsByCategory = allItems.reduce((acc, item) => {
        acc[item.itemCategory] = [...(acc[item.itemCategory] || []), item];
        return acc;
      }, {});

      setHairItems(itemsByCategory.hair || []);
      setSkinItems(itemsByCategory.skin || []);
      setEyesItems(itemsByCategory.eyes || []);
      setMouthItems(itemsByCategory.mouth || []);
      setClothesItems(itemsByCategory.clothes || []);
    };

    const displayInventoryItems = async () => {
      let hairBox = hairItems.map((item) => {
        return (
          <div className="itemInvCard">
            <div
              className="invItem"
              key={item.itemName}
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setHairBoxes(hairBox);

      let skinBox = skinItems.map((item) => {
        return (
          <div className="itemInvCard">
            <div
              className="invItem"
              key={item.itemName}
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setSkinBoxes(skinBox);

      let eyesBox = eyesItems.map((item) => {
        return (
          <div className="itemInvCard">
            <div
              className="invItem"
              key={item.itemName}
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setEyesBoxes(eyesBox);

      let mouthBox = mouthItems.map((item) => {
        return (
          <div className="itemInvCard">
            <div
              className="invItem"
              key={item.itemName}
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setMouthsBoxes(mouthBox);

      let clothesBox = clothesItems.map((item) => {
        return (
          <div className="itemInvCard">
            <div
              className="invItem"
              key={item.itemName}
              id={item.itemName}
              onClick={(event) => handleItemSelection(item)}
            >
              <img src={item.imageRef} alt={item.itemName} />
            </div>
          </div>
        );
      });
      setClothesBoxes(clothesBox);
    };

    getInventoryItemData();
    displayInventoryItems();
  }, []);
	
  /*Function to change avatar*/
  /*image - the img you wanna change it to, ID - ID of the image to be changed*/
  const changeImage = (image, ID) => {
    var img = document.getElementById(ID);
    img.src = image;
  };

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
          {hairBoxes}
        </div>
        <div className="itemContainer" id="skin">
          {skinBoxes}
        </div>
        <div className="itemContainer" id="eyes">
          {eyesBoxes}
        </div>
        <div className="itemContainer" id="mouth">
          {mouthBoxes}
        </div>
        <div className="itemContainer" id="clothes">
          {clothesBoxes}
        </div>
      </div>
    </div>
  );
};

export default Profile;
