//modules
import { useRoutes, Link, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// styling
import "../components/cssFile/shopPage.css";
import shopBasket from '../components/images/generalIcons/shoppingBasket.png'

//components
import ShopTabs from "../components/shopComponents/ShopTabs";
import ShopItems from "../components/shopComponents/shopItem";

const ShopPage = () => {
  //routes
  const tabLinkElements = useRoutes([
    { path: "/", element: <Navigate replace to="skin" /> },
    { path: ":category", element: <ShopTabs /> },
  ]);

  //variables
  let shopTabsName = ["Skin", "Hair", "Eyes", "Mouth", "Clothes"];
  // let coinAmount = 100;

  //handle click function
  let handleTabClick = (tabName) => {
    const tabNameA = document.querySelectorAll(".tabNameA");
    // console.log(tabNameA);
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
            <div className="coinCont"> {coinAmount} </div>
            <div className="charaTryOnView">
              <div className="itemCont backgroundFill"></div>
              <div className="skinCont itemCont">{ShopItems[9].image}</div>
              <div className="eyesCont itemCont"></div>
              <div className="mouthCont itemCont"></div>
              <div className="hairCont itemCont"></div>
              <div className="clothesCont itemCont"></div>
            </div>

            <div className="viewCartButton" onClick={clickViewCart}>
              <img src={shopBasket}/>
            </div>
          </div>
          <div className="cartTab"> Cart
            <div className="close-button" onClick={clickViewCart}> <b> X </b> </div>
            <div className="cartItemCont">

            </div>
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
