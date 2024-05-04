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
import trashCan from "../components/images/generalIcons/trashCan.png"

//components
import ShopTabs from "../components/shopComponents/ShopTabs";
import ShopItems from "../components/shopComponents/shopItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addToInventory,
  decreaseAmount,
} from "../redux/features/userInfoSlice";
import { removeItemFromCart, resetCartItems, resetTotal, updateTotalCost } from "../redux/features/shopCartSlice";

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
  const [activeTab, setActiveTab] = useState('skin')
  const profileIcon = useSelector((state) => state.profileIcon);
  const currentWallet = useSelector((state) => state.userInfo.wallet);
  console.log(currentWallet);
  let dispatch = useDispatch();
  const currentInventory = useSelector((state) => state.userInfo.inventory);
  const currentUserUID = useSelector((state) => state.userUID.uid);
  console.log(currentUserUID);
  const itemsInCart = useSelector(state => state.shopCart.shopCart)
  const [cartItemRender, setCartItemRender] = useState([])
  const cartTotalCost = useSelector(state => state.shopCart.cartTotal)

  //handle click function
  let handleTabClick = (tabName) => {
    setActiveTab(tabName);
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
      className={`tabLinks ${activeTab === tabName.toLowerCase() ? 'active' : ''}`}
      onClick={(event) => handleTabClick( tabName.toLowerCase())}
    >
      <Link to={tabName.toLowerCase()} className="tabNameA">
        {tabName}
      </Link>
    </div>
  ));

  let handleCheckOut = async () => {
    // checks if user has enough money

    //if not, prevent them from checking out 
    if (currentWallet >= cartTotalCost){
      // Updates Redux inventory
      console.log("item added to dispatch");
      // Dispatch the action to update the Redux state
      dispatch(addToInventory(itemsInCart.map(item=>item.itemName)));
      dispatch(decreaseAmount(cartTotalCost));
      //clear items in the cart and cclear total
      dispatch(resetCartItems());
      dispatch(resetTotal());
    }
  };

  const updateInventoryInDB = async () => {
    // Update Firebase wallet and inventory
    // console.log("current: ", currentInventory)
    try{
      const userDocRef = doc(db, "users", currentUserUID);
      await updateDoc(userDocRef, { // Pass the updates in the second argument
        inventory: currentInventory,
        wallet: currentWallet
      });
      console.log("updated db")
    }
    catch{
      console.log("failed to update wallet and inventory in db")
    }
  }

  let renderItemsInCart = () =>{
    let totalCost = 0
    itemsInCart.forEach(item =>{
      totalCost += item.cost
    })

    let cartContainerRenderBox = itemsInCart.map(item => {
      return (
        <div className={`newCartItem ${item.cost}`} id={item.itemName}>
          <div className="rightPanel"> <img src={item.imageRef} /> </div>
          <div className="leftPanel"> <div className="costCont"> {item.cost} Coins </div> 
          <div> <img className="trashImg" src={trashCan} onClick={() => handleDeleteItem(item)}/></div>
          </div>
        </div>
      )
    });

    setCartItemRender(cartContainerRenderBox)
    dispatch(updateTotalCost(totalCost));
  }

  const handleDeleteItem = (itemToDelete) => {
    dispatch(removeItemFromCart(itemToDelete))
  };

  useEffect(() => {
    console.log("items in itemsInCart: ", itemsInCart)
    renderItemsInCart();
  }, [itemsInCart])

  useEffect(() => {
    updateInventoryInDB();
  }, [currentInventory])

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
                <img src={profileIcon.skinLink} />
              </div>
              <div className="eyesCont itemCont">
                <img src={profileIcon.eyesLink} />
              </div>
              <div className="mouthCont itemCont">
                <img src={profileIcon.mouthLink} />
              </div>
              <div className="hairCont itemCont">
                <img src={profileIcon.hairLink} />
              </div>
              <div className="clothesCont itemCont">
                <img src={profileIcon.clothesLink} />
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
            <div className="cartItemCont">{cartItemRender}</div>
            <div className="totalValueCont"> Total: {cartTotalCost} </div>
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
