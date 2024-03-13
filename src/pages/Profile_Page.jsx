//import React from 'react';
import React, { useContext } from 'react'
import Avatar from '../components/profileComponents/Avatar.jsx';
import { Link } from 'react-router-dom';

//Clothes
import red_shirt from '../components/images/characterAssets/clothes/red_shirt.png'
import suit from '../components/images/characterAssets/clothes/suit.png'
//eyes
import blue_eyes from '../components/images/characterAssets/eyes/blue_eyes.png'
import brown_eyes from '../components/images/characterAssets/eyes/brown_eyes.png'
import green_eyes from '../components/images/characterAssets/eyes/green_eyes.png'

//hair 
import short_black_hair from '../components/images/characterAssets/hair/black_short_hair.png'
import blonde_bob from '../components/images/characterAssets/hair/blonde_bob.png'

//mouth
import smile_with_teeth from '../components/images/characterAssets/mouth/smile_with_teeth.png'
import smile from '../components/images/characterAssets/mouth/smile.png'

//skin
import skin1 from '../components/images/characterAssets/skin/skin1.png'
import skin2 from '../components/images/characterAssets/skin/skin2.png'
import skin3 from '../components/images/characterAssets/skin/skin3.png'
import skin4 from '../components/images/characterAssets/skin/skin4.png'
import skin5 from '../components/images/characterAssets/skin/skin5.png'

const Profile = () => {

    /*Function to change avatar*/
    /*image - the img you wanna change it to, ID - ID of the image to be changed*/
    const changeImage = (image, ID) => {
       var img = document.getElementById(ID);
       img.src = image;
    }
    
    return(
        <div className="profile">
            <Avatar />
        
            <div className="container2"> {/*right side*/}
                <h1>Inventory</h1>
                <table>
                    <thead>
                        <tr>{/*Column Names*/}
                            <th>hair</th>
                            <th>eyes</th>
                            <th>shirt</th>
                            <th>mouth</th>
                            <th>skin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> {/*Row 1*/}
                            <td><button onClick={() => changeImage(blonde_bob, 'hair')}><img src={blonde_bob}/></button></td>
                            <td><button onClick={() => changeImage(brown_eyes, 'eyes')}><img src={brown_eyes}/></button></td>
                            <td><button onClick={() => changeImage(red_shirt, 'shirt')}><img src={red_shirt}/></button></td>
                            <td><button onClick={() => changeImage(smile, 'mouth')}><img src={smile}/></button></td>
                            <td><button onClick={() => changeImage(skin1, 'skin')}><img src={skin1}/></button></td>
                        </tr>
                        <tr> {/*Row 2*/}
                            <td><button onClick={() => changeImage(short_black_hair, 'hair')}><img src={short_black_hair}/></button></td>
                            <td><button onClick={() => changeImage(blue_eyes, 'eyes')}><img src={blue_eyes}/></button></td>
                            <td><button onClick={() => changeImage(suit, 'shirt')}><img src={suit}/></button></td>
                            <td><button onClick={() => changeImage(smile_with_teeth, 'mouth')}><img src={smile_with_teeth}/></button></td>
                            <td><button onClick={() => changeImage(skin2, 'skin')}><img src={skin2}/></button></td>
                            
                        </tr>
                        <tr> {/*Row 3*/}
                            <td></td>
                            <td><button onClick={() => changeImage(green_eyes, 'eyes')}><img src={green_eyes}/></button></td>
                            <td></td>
                            <td></td>
                            <td><button onClick={() => changeImage(skin3, 'skin')}><img src={skin3}/></button></td>
                        </tr>
                    </tbody>
                </table>
                <h1 style={{padding:"10px"}}>Buy more in the shop!</h1>
                <Link to="../shop_page" style={{color: 'black'}}> <div className="button"> Shop </div> </Link>
            </div>
        </div>

    )
}

export default Profile