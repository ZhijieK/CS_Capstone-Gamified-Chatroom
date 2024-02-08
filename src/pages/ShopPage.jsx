//modules
import { useRoutes, Link } from "react-router-dom";

// styling
import "../components/cssFile/shopPage.css";

//components
import ShopTabs from "../components/shopComponents/ShopTabs";

const ShopPage = () => {
  const tabLinkElements = useRoutes([
    { path: ":category", element: <ShopTabs /> },
  ]);

  let shopTabsName = ["Skin", "Hair", "Eyes", "Mouth", "Clothes"];

  let handleTabClick = (tabName) => {
    const tabNameA = document.querySelectorAll(".tabNameA");
    // console.log(tabNameA);
    tabNameA.forEach((tabNameA) => {
      // console.log(tabNameA.textContent);
      // console.log(tabName.tabName);
      if (tabNameA.textContent === tabName.tabName) {
        tabNameA.style.backgroundColor = "#c6aeae";
        tabNameA.style.borderRadius = "5px";
      } else {
        tabNameA.style.backgroundColor = "#faebd7";
      }
    });
  };

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
      <div className="charaScreen">character</div>
      <div className="shopPanel">
        {/* display the tabls */}
        <div className="tabName">{renderedTabs}</div>
        <div>{tabLinkElements}</div>
      </div>
    </div>
  );
};

export default ShopPage;
