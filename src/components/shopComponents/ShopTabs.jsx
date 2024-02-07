//style sheet
import "../cssFile/shopPage.css"

//packages
import { useParams } from "react-router"

//components
import ShopItems from "./shopItem"
// import ChoiceBox from "./ChoiceBox"

const ShopTabs = () => {
    const category = useParams()
    const items = ShopItems.filter(item => item.itemCategory === category.category)

    // console.log(category)
    // console.log(items[0].ref)
    let choiceBoxes = items.map((item) => (
        <div>
            {item.image}
        </div>
    ))

    
    return (
        <div>
            {/* {category.category} */}
            {choiceBoxes}
        </div>
    )
}

export default ShopTabs