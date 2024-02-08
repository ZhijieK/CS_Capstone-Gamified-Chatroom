//style sheet
import "../cssFile/shopPage.css"

//packages
import { useParams } from "react-router"

//components
import ShopItems from "./shopItem"


const ShopTabs = () => {
    const category = useParams()
    // console.log(category)

    const items = ShopItems.filter(item => item.itemCategory === category.category);

    let handleItemSelection = (clickedItem) => {
       
        const allItems = document.querySelectorAll('.indItem')
        console.log(allItems.nodeName);

        allItems.forEach(item => {
            if (item.id === clickedItem.item.itemName) {
                item.style.backgroundColor = "#c6aeae";
            } else {
                item.style.backgroundColor = "#faebd7";
            }
        });
    };

    let choiceBoxes = items.map((item) => (
        <div className="indItem" key={item.itemName} id={item.itemName} onClick={(event) => handleItemSelection({item})}>
            {item.image}
        </div>
    ))

    
    return (
        <div className="choiceBoxCont">
            {choiceBoxes}
        </div>
    )
}

export default ShopTabs