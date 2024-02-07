// styling
import "../components/cssFile/shopPage.css"

//components
import ShopTabs from "../components/ShopTabs"
import ChoiceBox from "../components/ChoiceBox"

const ShopPage = () => {
    let shopTabsName = ["Hair", "Eyes", "Tops"]
    let renderedTabs = shopTabsName.map((tabName) => (
        <div key={tabName}>{tabName}</div>
    ));
    // elements

    return(
        <div className="view">
            <div className="charaScreen">
                character 
            </div>
            <div className="shopPanel">
                Shop Panel
                {/* display the tabls */}
                <div className="tabName">
                    {renderedTabs}
                </div>
                <div className="tabDisplay"> 
                    <ChoiceBox />
                    <ChoiceBox />
                    <ChoiceBox />
                    <ChoiceBox />
                </div>
            </div>
        </div>
    )
}

export default ShopPage