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

// =================================================
import blue_shirt from "../images/characterAssets/clothes/blue_shirt.png"
import green_shirt from "../images/characterAssets/clothes/green_shirt.png"
import purple_shirt from "../images/characterAssets/clothes/purple_shirt.png"

import blue_oval_eyes from "../images/characterAssets/eyes/blue_oval_eyes.png"
import brown_circle_eyes from "../images/characterAssets/eyes/brown_circle_eyes.png"
import brown_oval_eyes from "../images/characterAssets/eyes/brown_oval_eyes.png"
import green_circle_eyes from "../images/characterAssets/eyes/green_circle_eyes.png"
import green_oval_eyes from "../images/characterAssets/eyes/green_oval_eyes.png"
import sunglasses from "../images/characterAssets/eyes/sunglasses.png"

import black_bob from "../images/characterAssets/hair/black_bob.png"
import black_bowl_hair from "../images/characterAssets/hair/black_bowl_hair.png"
import black_long_hair from "../images/characterAssets/hair/black_long_hair.png"
import black_side_pigtails from "../images/characterAssets/hair/black_side_pigtails.png"

import blonde_bowl_hair from "../images/characterAssets/hair/blonde_bowl_hair.png"
import blonde_long_hair from "../images/characterAssets/hair/blonde_long_hair.png"
import blonde_side_pigtails from "../images/characterAssets/hair/blonde_side_pigtails.png"
import blonde_short_hair from "../images/characterAssets/hair/blonde_short_hair.png"
import brown_bob from "../images/characterAssets/hair/brown_bob.png"
import brown_bowl_hair from "../images/characterAssets/hair/brown_bowl_hair.png"
import brown_long_hair from "../images/characterAssets/hair/brown_long_hair.png"
import brown_side_pigtails from "../images/characterAssets/hair/brown_side_pigtails.png"
import brown_short_hair from "../images/characterAssets/hair/brown_short_hair.png"
import red_bob from "../images/characterAssets/hair/red_bob.png"
import red_bowl_hair from "../images/characterAssets/hair/red_bowl_hair.png"
import red_long_hair from "../images/characterAssets/hair/red_long_hair.png"
import red_side_pigtails from "../images/characterAssets/hair/red_side_pigtails.png"
import red_short_hair from "../images/characterAssets/hair/red_short_hair.png"

import bandaid_nose from "../images/characterAssets/mouth/bandaid_nose.png"
import cat_mouth from "../images/characterAssets/mouth/cat_mouth.png" 
import pout from "../images/characterAssets/mouth/pout.png"
import shocked_mouth from "../images/characterAssets/mouth/shocked_mouth.png"
import side_bandage from "../images/characterAssets/mouth/side_bandage.png"
import small_smile from "../images/characterAssets/mouth/small_smile.png"
import tongue_out from "../images/characterAssets/mouth/tongue_out.png"


bandaid_nose
cat_mouth
pout
shocked_mouth
side_bandage
small_smile
tongue_out
const ShopItems = [
    {
        itemName: "bandaid_nose", 
        itemCategory: "mouth", 
        image: <img src={bandaid_nose}/>,
    },
    {
        itemName: "cat_mouth", 
        itemCategory: "mouth", 
        image: <img src={cat_mouth}/>,
    },
    {
        itemName: "pout", 
        itemCategory: "mouth", 
        image: <img src={pout}/>,
    },
    {
        itemName: "shocked_mouth", 
        itemCategory: "mouth", 
        image: <img src={shocked_mouth}/>,
    },
    {
        itemName: "side_bandage", 
        itemCategory: "mouth", 
        image: <img src={side_bandage}/>,
    },
    {
        itemName: "small_smile", 
        itemCategory: "mouth", 
        image: <img src={small_smile}/>,
    },
    {
        itemName: "tongue_out", 
        itemCategory: "mouth", 
        image: <img src={tongue_out}/>,
    },
]

export default ShopItems



//this is just the template for easy copy and paste
const ShopItemsSample = [
    {
        itemName: "",
        itemColors: "", //should be an array of colors
        itemCategory: "", //should be skin, hair, eyes or shirt
        inInventory : false, //when bought, change it to true
        image: <img src={''}/>, //the reference to the assets 
    },
    {
        itemName: "",
        itemColors: "", 
        itemCategory: "",
        inInventory : false, 
        image: <img src={''}/>,
    }
]