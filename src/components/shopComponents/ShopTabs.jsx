//style sheet
import "../cssFile/shopPage.css";

//packages
import { useParams } from "react-router";
import { useEffect, useState } from "react";

//components
import ShopItems from "./shopItem";

//firebase related packages
import { db, auth, storage } from "../../firebase";
import { doc, collection, getDoc, query, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";


const ShopTabs = () => {
  //creates a shop database
  const getItemsFromDatabase = async (storageRef) => {
    // console.log(storageRef)
    //goes and check if new items needs to be added into the database
    try {
      await Promise.all(
        ShopItems.map(async (item) => {
          // console.log(item.itemName, item.itemCategory)
          const shopItemRef = doc(db, "shopItems", item.itemName);
          const imageRef = item.itemCategory + "/" + item.itemName + ".png"
          console.log(imageRef)
          const docSnapshot = await getDoc(shopItemRef);
          if (!docSnapshot.exists()) {
            console.log("Adding new item:");
            await setDoc(doc(db, "shopItems", item.itemName), 
              {
                itemName: item.itemName,
                itemCategory: item.itemCategory,
                imageRef: imageRef,
              }
            );
          }
        })
      );
    } catch (error) {
      console.log("Fetching data base failed", error);
    }

    //get all items from the database



  };

  useEffect(() => {
    // gets the storage ref
    try{
      const storageRef = ref(getStorage());
      // console.log(storageRef)
      getItemsFromDatabase(storageRef);
    }
    catch(error){
      console.log("Cannot get storage link", error)
    }
  }, []);

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

  let clickAddToCart = () => {};

  let choiceBoxes = items.map((item) => (
    <div>
      {/* image item */}
      <div style={{ color: "#faebd7" }}>{itemCost} Coins</div>
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
