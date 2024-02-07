//modules
import { useRoutes, Link } from "react-router-dom";

// styling
import "../components/cssFile/shopPage.css";

//components
import ShopTabs from "../components/shopComponents/ShopTabs";
import ChoiceBox from "../components/shopComponents/ChoiceBox";

const ShopPage = () => {
    const tabLinkElements = useRoutes([
      {path: ":category", element : <ShopTabs />}
    ])

    let shopTabsName = ["Skin", "Hair", "Eyes", "Mouth", "Tops"];
    let renderedTabs = shopTabsName.map((tabName) => (
    <div key={tabName} className="tabLinks">
        <Link to={tabName.toLowerCase()}>
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
        <div>
            {tabLinkElements}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
