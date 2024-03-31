//modules
import { useRoutes, Link, useParams, Navigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

// styling
import "../components/cssFile/shopPage.css";
import shopBasket from "../components/images/generalIcons/shoppingBasket.png";

//components
import ShopTabs from "../components/shopComponents/ShopTabs";
import ShopItems from "../components/shopComponents/shopItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInventory,
  decreaseAmount,
} from "../redux/features/userInfoSlice";

const ShopPage = () => {
  const currentUser = useContext(AuthContext);
  console.log("currentUser: ", currentUser);
  //routes
  const tabLinkElements = useRoutes([
    { path: "/", element: <Navigate replace to="skin" /> },
    { path: ":category", element: <ShopTabs /> },
  ]);
  //variables
  let shopTabsName = ["Skin", "Hair", "Eyes", "Mouth", "Clothes"];
  const profileIcon = useSelector((state) => state.profileIcon);
  const currentWallet = useSelector((state) => state.userInfo.wallet);
  console.log(currentWallet);
  let dispatch = useDispatch();
  const currentInventory = useSelector((state) => state.userInfo.inventory);
  const currentUserUID = useSelector((state) => state.userUID.uid);
  console.log(currentUserUID);

  //handle click function
  let handleTabClick = (tabName) => {
    const tabNameA = document.querySelectorAll(".tabNameA");
    tabNameA.forEach((tabNameA) => {
      if (tabNameA.textContent === tabName.tabName) {
        tabNameA.style.backgroundColor = "#c6aeae";
        tabNameA.style.borderRadius = "5px";
      } else {
        tabNameA.style.backgroundColor = "#faebd7";
      }
    });
  };

  let clickViewCart = () => {
    let cartTab = document.querySelector(".cartTab");
    if (cartTab.style.display === "none" || cartTab.style.display === "") {
      cartTab.style.display = "block";
    } else {
      cartTab.style.display = "none";
    }
  };

  //render tabs
  let renderedTabs = shopTabsName.map((tabName) => (
    <div
      key={tabName}
      className="tabLinks"
      id={tabName}
      onClick={(event) => handleTabClick({ tabName })}
    >
      <Link to={tabName.toLowerCase()} className="tabNameA">
        {tabName}
      </Link>
    </div>
  ));

  let handleCheckOut = async () => {
    // checks if user has enough money

    //if not, prevent them from checking out 

    // Updates Redux inventory
    let cartItems = document.querySelectorAll(".newCartItem");
    let purchasedItem = [];
    let totalCostOfItems = 0;
    cartItems.forEach((item) => {
      const itemId = item.id; // Access the id of the element
      purchasedItem.push(itemId);

      const className = Array.from(item.classList);
      const price = className[1];
      // console.log("price: ", price)
      totalCostOfItems += price;
    });

    console.log("item added to dispatch");
    // Dispatch the action to update the Redux state
    dispatch(addToInventory(purchasedItem));
    dispatch(decreaseAmount(totalCostOfItems));

    // Update Firebase wallet and inventory
    try{
      await updateDoc(doc(db, "users", currentUserUID, {
        inventory: currentInventory,
        wallet: currentWallet
      }))
    }
    catch{
      console.log("failed to update wallet and inventory in db")
    }

    //clear items in the cart 
    let cartItemCont = document.querySelector(".cartItemCont")
    while (cartItemCont.hasChildNodes()){
      cartItemCont.removeChild(cartItemCont.firstChild);
    }

    //make cart amount 0
    let totalValueCont = document.querySelector(".totalValueCont")
    totalValueCont.textContent = `Total Cost: 0 Coins`

    //set a message of purchase successful
  };

  return (
    <div className="shopBackground">
      <div className="view">
        <div className="shopBanner">
          <h1> Shop </h1>
        </div>
        <div className="storeCont">
          <div className="charaScreen">
            <Link to="../profile">
              <div className="goBack"> Back </div>
            </Link>
            <div className="coinCont"> {currentWallet} Coins</div>
            <div className="charaTryOnView">
              <div className="itemCont backgroundFill"></div>
              <div className="skinCont itemCont">
                <img src={profileIcon.skin} />
              </div>
              <div className="eyesCont itemCont">
                <img src={profileIcon.eyes} />
              </div>
              <div className="mouthCont itemCont">
                <img src={profileIcon.mouth} />
              </div>
              <div className="hairCont itemCont">
                <img src={profileIcon.hair} />
              </div>
              <div className="clothesCont itemCont">
                <img src={profileIcon.clothes} />
              </div>
            </div>

            <div className="viewCartButton" onClick={clickViewCart}>
              <img src={shopBasket} />
            </div>
          </div>
          <div className="cartTab">
            {" "}
            Cart
            <div className="close-button" onClick={clickViewCart}>
              {" "}
              <b> X </b>{" "}
              <div className="checkoutButton" onClick={handleCheckOut}>
                {" "}
                Checkout{" "}
              </div>
            </div>
            <div className="cartItemCont"></div>
            <div className="totalValueCont"> Nothing in Cart </div>
          </div>
          <div className="shopPanel">
            {/* display the tabls */}
            <div className="tabName">{renderedTabs}</div>
            <div>{tabLinkElements}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
