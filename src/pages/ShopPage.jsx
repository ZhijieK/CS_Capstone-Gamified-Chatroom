//modules
import { useRoutes, Link } from "react-router-dom";

// styling
import "../components/cssFile/shopPage.css";

//components
import ShopTabs from "../components/shopComponents/ShopTabs";
import ShopItems from "../components/shopComponents/shopItem";

const ShopPage = () => {
  // console.log();

  //routes
  const tabLinkElements = useRoutes([
    { path: ":category", element: <ShopTabs /> },
  ]);

  //variables
  let shopTabsName = ["Skin", "Hair", "Eyes", "Mouth", "Clothes"];
  let coinAmount = 100;

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
        // tabNameA:hover.style.color = "faebd7";
        // tabNameA:hover.style.backgroundColor = "#cdb4b4";
      }
    });
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
    <div className="view">
      <div className="charaScreen">
        <div className="goBack"> <Link to="../">  Go Back </Link> </div>
        <div className="coinCont"> {coinAmount} </div>
        <div className="itemCont backgroundFill"></div>
        <div className="skinCont itemCont">{ShopItems[9].image}</div>
        <div className="eyesCont itemCont"></div>
        <div className="mouthCont itemCont"></div>
        <div className="hairCont itemCont"></div>
        <div className="clothesCont itemCont"></div>

        <div className="viewCartButton"> Cart Image </div>
      </div>
      <div className="shopPanel">
        {/* display the tabls */}
        <div className="tabName">{renderedTabs}</div>
        <div>{tabLinkElements}</div>
      </div>
    </div>
  );
};

export default ShopPage;
