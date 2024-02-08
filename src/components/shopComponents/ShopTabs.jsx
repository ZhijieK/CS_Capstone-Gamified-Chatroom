//style sheet
import "../cssFile/shopPage.css"

//packages
import { useParams } from "react-router"

//components
import ShopItems from "./shopItem"
// import ChoiceBox from "./ChoiceBox"

const ShopTabs = () => {
    const category = useParams()
    console.log(category)
    // catergory === null 
    const items = ShopItems.filter(item => item.itemCategory === category.category)

    
    // console.log(items[0].ref)
    let choiceBoxes = items.map((item) => (
        <div className="indItem" key={item.itemName}>
            {item.image}
        </div>
    ))

    
    return (
        <div className="choiceBoxCont">
            {/* {category.category} */}
            {choiceBoxes}
        </div>
    )
}

export default ShopTabs