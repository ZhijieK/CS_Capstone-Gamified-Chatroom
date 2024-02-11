//style sheet
import "../cssFile/shopPage.css";

//packages
import { useParams } from "react-router";

//components
import ShopItems from "./shopItem";

const ShopTabs = () => {
  const category = useParams();
  // console.log(category)

  const items = ShopItems.filter(
    (item) => item.itemCategory === category.category
  );

  let handleItemSelection = (clickedItem) => {
    const allItems = document.querySelectorAll(".indItem");
    allItems.forEach((item) => {
      if (item.id === clickedItem.item.itemName) {
        item.style.backgroundColor = "#c6aeae";
      } else {
        item.style.backgroundColor = "#faebd7";
      }
    });

    //selects the container
    const itemToAppear = document.querySelector(
      `.${clickedItem.item.itemCategory}Cont`
    );

    // console.log(itemToAppear.hasChildNodes());
    if (itemToAppear.hasChildNodes()){
        // console.log("true, item removed")
        console.log(itemToAppear.lastChild)
        itemToAppear.removeChild(itemToAppear.lastChild)
    }

    let itemToAppearImg = document.createElement("img");
    itemToAppearImg.src = clickedItem.item.image.props.src;
    itemToAppear.appendChild(itemToAppearImg);
  };

  let choiceBoxes = items.map((item) => (
    <div
      className="indItem"
      key={item.itemName}
      id={item.itemName}
      onClick={(event) => handleItemSelection({ item })}
    >
      {item.image}
    </div>
  ));

  return <div className="choiceBoxCont">{choiceBoxes}</div>;
};

export default ShopTabs;