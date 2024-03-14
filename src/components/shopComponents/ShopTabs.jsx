//style sheet
import "../cssFile/shopPage.css";

//packages
import { useParams } from "react-router";
import { useEffect, useState } from "react";

//components
import ShopItems from "./shopItem";

//firebase related packages
import { db, auth, storage } from "../../firebase";
import {
  doc,
  collection,
  getDoc,
  query,
  setDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, list, ref } from "firebase/storage";

const ShopTabs = () => {
  //variables

  const category = useParams().category;
  // console.log(category);
  const [containsItems, setContainsItems] = useState(false);
  const [choiceBoxes, setChoiceBoxes] = useState([]);

  //creates a shop database
  const addItemsToDatabase = async (storageRef) => {
    // console.log(storageRef)
    //goes and check if new items needs to be added into the database
    try {
      await Promise.all(
        ShopItems.map(async (item) => {
          // console.log(item.itemName, item.itemCategory)
          //attempts to grab the doc from collection
          const shopItemRef = await getDoc(doc(db, "shopItems", item.itemName));
          //creates the image link
          const imageRef = item.itemCategory + "/" + item.itemName + ".png";
          //random number generator from 50-200
          const cost = (Math.floor(Math.random() * 21) + 10) * 5;
          // console.log(imageRef)
          if (!shopItemRef.exists()) {
            console.log("Adding new item:");
            await setDoc(doc(db, "shopItems", item.itemName), {
              itemName: item.itemName,
              itemCategory: item.itemCategory,
              cost: cost,
              imageRef: imageRef,
            });
          }
        })
      );
    } catch (error) {
      console.log("Fetching data base failed", error);
    }
  };

  const getItemsFromDatabase = async () => {
    //get all items from the database that matches the category
    let listOfItems = [];
    let promises = [];
    // var box = [];
    const itemSnapshot = await getDocs(
      query(collection(db, "shopItems"), where("itemCategory", "==", category))
    );

    //query the snapshot to get the item attributes and url link for the array
    itemSnapshot.forEach((doc) => {
      let promise = getDownloadURL(ref(storage, doc.data().imageRef))
        .then((url) => {
          console.log(url);
          listOfItems.push({
            cost: doc.data().cost,
            imageRef: url,
            itemCategory: doc.data().itemCategory,
            itemName: doc.data().itemName,
          });
        })
        .catch((error) => {
          console.log("Error fetching image url", error);
        });
      promises.push(promise);
    });

    Promise.all(promises)
      .then(() => {
        // listOfItems.map((item) => {
        //   console.log(item.cost, item.itemName, item.imageRef)
        // })
        let box = listOfItems.map((item) => {
          return (
            // Add this return statement
            <div className="itemCard">
              <div className="costText"> {item.cost} Coins</div>
              <div
                className="indItem"
                key={item.itemName}
                id={item.itemName}
                onClick={(event) => handleItemSelection({ item })}
              >
                <img src={item.imageRef} alt={item.itemName} />
              </div>
              <div className="addToCartButton">Add to Cart</div>
            </div>
          );
        });
        setChoiceBoxes(box);
      })
      .catch((error) => {
        console.log("Error fecthing all urls", error);
      });
  };

  useEffect(() => {
    // gets the storage ref
    try {
      const storageRef = ref(getStorage());
      addItemsToDatabase(storageRef);
    } catch (error) {
      console.log("Cannot get storage link", error);
    }
    getItemsFromDatabase();
  }, [category]);

  // //handle click selection
  let handleItemSelection = (clickedItem) => {
    const allItems = document.querySelectorAll(".indItem");
    allItems.forEach((item) => {
      //shows that an item has been selected by changing the background color
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
      console.log("true, item removed");
      console.log(itemToAppear.lastChild);
      itemToAppear.removeChild(itemToAppear.lastChild);
    }

    //if yes, remove item from container and add selected item
    console.log("hello");
    let itemToAppearImg = document.createElement("img");
    console.log(clickedItem.item.imageRef);
    itemToAppearImg.src = clickedItem.item.imageRef;
    itemToAppear.appendChild(itemToAppearImg);
  };

  let clickAddToCart = () => {};

  return (
    <div className="itemTabCont">
      {choiceBoxes ? choiceBoxes : <div> No Items In This Category</div>}
    </div>
  );
};

export default ShopTabs;
