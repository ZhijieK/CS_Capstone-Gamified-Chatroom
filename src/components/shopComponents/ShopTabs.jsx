//style sheet
import "../cssFile/shopPage.css";

//packages
import { useParams } from "react-router";

//components
import ShopItems from "./shopItem";

const ShopTabs = () => {
  //variables
  const category = useParams();
  const itemCost = 50;
  // console.log(category)

  //filter items for the specific catergory
  const items = ShopItems.filter(
    (item) => item.itemCategory === category.category
  );

  //handle click selection
  let handleItemSelection = (clickedItem) => {
    const allItems = document.querySelectorAll(".indItem");
    allItems.forEach((item) => {
      if (item.id === clickedItem.item.itemName) {
        item.style.backgroundColor = "#c6aeae";
      } else {
        item.style.backgroundColor = "#faebd7";
      }
    });

    //selects the container that will hold the item
    const itemToAppear = document.querySelector(
      `.${clickedItem.item.itemCategory}Cont`
    );

    //checks if there is an item already in the container
    // console.log(itemToAppear.hasChildNodes());
    if (itemToAppear.hasChildNodes()) {
      // console.log("true, item removed")
      console.log(itemToAppear.lastChild);
      itemToAppear.removeChild(itemToAppear.lastChild);
    }

    //if yes, remove item from container and add selected item
    let itemToAppearImg = document.createElement("img");
    itemToAppearImg.src = clickedItem.item.image.props.src;
    itemToAppear.appendChild(itemToAppearImg);

    //displays the add to cart field
  };

  let choiceBoxes = items.map((item) => (
    <div>
      {/* image item */}
      <div style={{color: "#faebd7"}}>{itemCost} Coins</div>
      <div
        className="indItem"
        key={item.itemName}
        id={item.itemName}
        onClick={(event) => handleItemSelection({ item })}
      >
        {item.image}
      </div>
      <div className="addToCartButton">Add to Cart</div>
    </div>
  ));

  return <div className="choiceBoxCont">{choiceBoxes}</div>;
};

export default ShopTabs;
