import React, { useContext, useEffect, useRef, useState } from "react";
import Avatar from "../components/profileComponents/Avatar.jsx";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import {
  doc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
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
  setSkinLink,
  setHairLink,
  setEyesLink,
  setMouthLink,
  setClothesLink,
} from "../redux/features/profileIconSlice.js";
import "../components/cssFile/profile.css";

const Profile = () => {
  const currentUserUID = useSelector((state) => state.userUID.uid);
  const dispatch = useDispatch();
  const arrayOfOwnedItems = useSelector((state) => state.userInfo.inventory);
  const profileIcon = useSelector((state) => state.profileIcon);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  //states that'll render on the page
  const [inventoryBox, setInventoryBox] = useState([]);

  //click to try on outfit
  let handleItemSelection = (clickedItem) => {
    console.log(clickedItem)
    const itemCateq = clickedItem.itemCategory;
    const itemName = clickedItem.itemName;
    const imageRef = clickedItem.imageRef;
    switch (itemCateq) {
      case "hair":
        dispatch(setHair(itemName));
        dispatch(setHairLink(imageRef));
        break;
      case "skin":
        dispatch(setSkin(itemName));
        dispatch(setSkinLink(imageRef));
        break;
      case "eyes":
        dispatch(setEyes(itemName));
        dispatch(setEyesLink(imageRef));
        break;
      case "mouth":
        dispatch(setMouth(itemName));
        dispatch(setMouthLink(imageRef));
        break;
      case "clothes":
        dispatch(setClothes(itemName));
        dispatch(setClothesLink(imageRef));
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

  useEffect(() => {
    const updateProfileIconInDB = async () => {
      try {
        const docRef = doc(db, "users", currentUserUID);
        await updateDoc(docRef, {
          "profileIcon.clothes": profileIcon.clothes,
          "profileIcon.eyes": profileIcon.eyes,
          "profileIcon.hair": profileIcon.hair,
          "profileIcon.mouth": profileIcon.mouth,
          "profileIcon.skin": profileIcon.skin,
        });
        console.log("Profile icon updated in DB");
      } catch (error) {
        console.error("Failed to update profile icon in DB", error);
      }
    };

    updateProfileIconInDB();
  }, [profileIcon]);

  return (
    <div className="profile">
      <Avatar />
      <div className="container2">
        <h1>Inventory</h1>
        <Link to="../shop_page" style={{ color: "black" }}>
          <div className="button">Shop</div>
        </Link>
        <div className="itemContainer">
          {loading ? (
            <p>Loading inventory...</p>
          ) : (
            inventoryItems.map((item) => (
              <div className="itemInvCard" key={item.itemName}>
                <div
                  className="invItem"
                  onClick={() => handleItemSelection(item)}
                >
                  <img src={item.imageRef} alt={item.itemName} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
