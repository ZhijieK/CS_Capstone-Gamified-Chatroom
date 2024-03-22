//import React from 'react';
import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../components/profileComponents/Avatar.jsx';
import { Link } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);

    const {currentUser} = useContext(AuthContext)
    // console.log(currentUser.uid, typeof(currentUser.uid))
    
    const getUserInfoFromDB = async () =>{
        try{
            let userData = await getDoc(doc(db, "users", currentUser.uid));
            setUserInfo(userData.data())
            console.log(userInfo)
            console.log(userInfo.inventory)
            console.log(userInfo.profileIcon)
        }catch(error){
            console.log("Could not find user with data",error)
        }
        // console.log(Userdata)
    }

    useEffect(()=>{
        getUserInfoFromDB();
    }, []);

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
                {/* <h1 style={{padding:"10px"}}>Buy more in the shop!</h1> */}
                <Link to="../shop_page" style={{color: 'black'}}> <div className="button"> Shop </div> </Link>

                <div>
                    <div> //hair 

                    </div>
                    <div> //skin

                    </div>
                    <div> // eyes

                    </div>
                    <div> //mouth

                    </div>
                    <div> //clothe

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile

{/* <table>
                    <thead>
                        <tr>
                            <th>hair</th>
                            <th>eyes</th>
                            <th>shirt</th>
                            <th>mouth</th>
                            <th>skin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td><button onClick={() => changeImage(blonde_bob, 'hair')}><img src={blonde_bob}/></button></td>
                            <td><button onClick={() => changeImage(brown_eyes, 'eyes')}><img src={brown_eyes}/></button></td>
                            <td><button onClick={() => changeImage(red_shirt, 'shirt')}><img src={red_shirt}/></button></td>
                            <td><button onClick={() => changeImage(smile, 'mouth')}><img src={smile}/></button></td>
                            <td><button onClick={() => changeImage(skin1, 'skin')}><img src={skin1}/></button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => changeImage(short_black_hair, 'hair')}><img src={short_black_hair}/></button></td>
                            <td><button onClick={() => changeImage(blue_eyes, 'eyes')}><img src={blue_eyes}/></button></td>
                            <td><button onClick={() => changeImage(suit, 'shirt')}><img src={suit}/></button></td>
                            <td><button onClick={() => changeImage(smile_with_teeth, 'mouth')}><img src={smile_with_teeth}/></button></td>
                            <td><button onClick={() => changeImage(skin2, 'skin')}><img src={skin2}/></button></td>
                            
                        </tr>
                        <tr>
                            <td></td>
                            <td><button onClick={() => changeImage(green_eyes, 'eyes')}><img src={green_eyes}/></button></td>
                            <td></td>
                            <td></td>
                            <td><button onClick={() => changeImage(skin3, 'skin')}><img src={skin3}/></button></td>
                        </tr>
                    </tbody>
                </table> */}