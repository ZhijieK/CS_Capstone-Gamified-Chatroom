//import all images to here first
//clothes
import red_shirt from '../images/characterAssets/clothes/red_shirt.png'
import suit from '../images/characterAssets/clothes/suit.png'

//eyes
import blue_eyes from '../images/characterAssets/eyes/blue_eyes.png'
import brown_eyes from '../images/characterAssets/eyes/brown_eyes.png'
import green_eyes from '../images/characterAssets/eyes/green_eyes.png'

//hair 
import short__black_hair from '../images/characterAssets/hair/black_short_hair.png'
import blonde_bob from '../images/characterAssets/hair/blonde_bob.png'

//mouth
import smile_with_teeth from '../images/characterAssets/mouth/smile_with_teeth.png'
import smile from '../images/characterAssets/mouth/smile.png'

//skin
import skin1 from '../images/characterAssets/skin/skin1.png'
import skin2 from '../images/characterAssets/skin/skin2.png'
import skin3 from '../images/characterAssets/skin/skin3.png'
import skin4 from '../images/characterAssets/skin/skin4.png'
import skin5 from '../images/characterAssets/skin/skin5.png'

const ShopItems = [
    {
        itemName: "shirt",
        itemColors: ["red"], 
        itemCategory: "clothes", 
        inInventory : false, 
        image: <img src={red_shirt}/>,
    },
    {
        itemName: "suit",
        itemColors: ["black"], 
        itemCategory: "clothes",
        inInventory : false,
        image: <img src={suit}/>, 
    },
    {
        itemName: "short_bair",
        itemColors: ["black"], 
        itemCategory: "hair",
        inInventory : false, 
        image: <img src={short__black_hair}/>
    },
    {
        itemName: "bob_hair",
        itemColors: ["blonde"], 
        itemCategory: "hair",
        inInventory : false, 
        image: <img src={blonde_bob}/>
    },
    {
        itemName: "blue_eyes",
        itemColors: ["blue"], 
        itemCategory: "eyes",
        inInventory : false, 
        image: <img src={blue_eyes}/>,
    },
    {
        itemName: "brown_eyes",
        itemColors: ["brown"], 
        itemCategory: "eyes",
        inInventory : false, 
        image: <img src={brown_eyes}/>,
    },
    {
        itemName: "green_eyes",
        itemColors: ["green"], 
        itemCategory: "eyes",
        inInventory : false, 
        image: <img src={green_eyes}/>,
    },
    {
        itemName: "smile_with_teeth",
        itemColors: [], 
        itemCategory: "mouth",
        inInventory : false, 
        image: <img src={smile_with_teeth}/>,
    },
    {
        itemName: "smile",
        itemColors: [], 
        itemCategory: "mouth",
        inInventory : false, 
        image: <img src={smile}/>,
    },
    {
        itemName: "skin1",
        itemColors: [], 
        itemCategory: "skin",
        inInventory : false, 
        image: <img src={skin1}/>,
    },
    {
        itemName: "skin2",
        itemColors: [], 
        itemCategory: "skin",
        inInventory : false, 
        image: <img src={skin2}/>,
    },
    {
        itemName: "skin3",
        itemColors: [], 
        itemCategory: "skin",
        inInventory : false, 
        image: <img src={skin3}/>,
    },
    {
        itemName: "skin4",
        itemColors: [], 
        itemCategory: "skin",
        inInventory : false, 
        image: <img src={skin4}/>,
    },
    {
        itemName: "skin5",
        itemColors: [], 
        itemCategory: "skin",
        inInventory : false,
        image: <img src={skin5}/>,
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
        image: <img src={''}/>, //the reference to the assets 
    },
    {
        itemName: "",
        itemColors: [], 
        itemCategory: "",
        inInventory : false, 
        image: <img src={''}/>,
    }
]