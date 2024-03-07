//style sheet
import "../cssFile/shopPage.css";

//packages
import { useParams } from "react-router";
import { useEffect, useState } from "react";

//components
import ShopItems from "./shopItem";

//firebase related packages
import { db, auth } from "../../firebase";
import { doc, collection, getDoc, query, setDoc } from "firebase/firestore";


const ShopTabs = () => {

  const itemConverter = {
    toFirestore: (item) => {
      return {
        itemName: item.itemName,
        itemCategory: item.itemCategory,
        image: item.image
      };
    }
  };
  //creates a shop database
  const addNewItemsToDatabase = async () => {
    try {
      await Promise.all(
        ShopItems.map(async (item) => {
          console.log(item.itemName, item.itemCategory)
          const shopItemRef = doc(db, "shopItems", item.itemName);
          const docSnapshot = await getDoc(shopItemRef);
          if (docSnapshot.exists()) {
            console.log("Item already exists:", docSnapshot.data());
          } else {
            console.log("Adding new item:");
            // const newItemRef = doc(db, item).withConverter(itemConverter);
            // console.log(newItemRef)
            // const data = itemConverter.toFirestore(item)
            await setDoc(doc(db, "shopItems", item.itemName), 
              {
                itemName: item.itemName,
                itemCategory: item.itemCategory,
              }
            );
            // await setDoc(doc(db, "chats", combinedId), {messages:[]});
          }
        })
      );
    } catch (error) {
      console.log("Fetching data base failed", error);
    }
  };

  useEffect(() => {
    addNewItemsToDatabase();
  }, []);
  // useEffect(()=> {
  //   const shopItems = db.collection('shopItems');

  //   shopItems.get().then((snapshot)=>{
  //     if (snapshot.empty){
  //       const batch = db.batch();

  //       ShopItems.forEach((item) => {
  //         const doc = shopItems.doc();
  //         batch.set(doc, item);
  //       });

  //       batch.commit().then(() => {
  //         console.log('Initial shop items added successfully')
  //       }).catch((error) => {
  //         console.log('Error adding initial shop items')
  //       });
  //     }
  //   }).catch((error) => {
  //     console.log('Error checking shopItems collection', error)
  //   });
  // }, []);

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
