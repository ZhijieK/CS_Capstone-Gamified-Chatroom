import short__black_hair from '../images/characterAssets/hair/black_short_hair.png'
import blonde_bob from '../images/characterAssets/hair/blonde_bob.png'

const ShopItems = [
    {
        itemName: "shirt",
        itemColors: ["red"], 
        itemCategory: "clothes", 
        inInventory : false, 
        ref: "../images/characterAssets/clothes/red_shirt.png",
    },
    {
        itemName: "suit",
        itemColors: ["black"], 
        itemCategory: "clothes",
        inInventory : false, 
        ref: "../images/characterAssets/clothes/suit.png", 
    },
    {
        itemName: "short_bair",
        itemColors: ["black"], 
        itemCategory: "hair",
        inInventory : false, 
        image: <img src={short__black_hair}/>
        // <img src={fireflies}/>,
    },
    {
        itemName: "bob_hair",
        itemColors: ["blonde"], 
        itemCategory: "hair",
        inInventory : false, 
        image: <img src={blonde_bob}/>
    }

]

export default ShopItems



//this is just the template for easy copy and paste
const ShopItemsSample = [
    {
        itemName: "",
        itemColors: [], //should be an array of colors
        itemCategory: "", //should be skin, hair, eyes or shirt
        inInventory : false, //when bought, change it to true
        ref: "", //the reference to the assets 
    },
    {
        itemName: "",
        itemColors: [], 
        itemCategory: "",
        inInventory : false, 
        ref: "", 
    }
]