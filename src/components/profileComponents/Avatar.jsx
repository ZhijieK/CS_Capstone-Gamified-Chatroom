import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import filler from '../images/generalIcons/filler.png'; /* Transparant img, placeholder for avatar before creation */
import edit from '../images/generalIcons/edit.png';

const Avatar = () => {

  const {currentUser} = useContext(AuthContext);

  return (
            <div className="container"> {/*Grey box on left side*/}
                <div className="bar">
                <Link to="../" style={{color: 'black'}}> <div className="button"> Go Back </div> </Link>
                <p style={{fontSize: 35,padding:20}}>Profile</p>
                <div className="button2"><img src={edit} /></div>
                </div>
                {/*The Avatar*/}
                <div className="circle"> 
                <img src={filler} id ='skin' />
                <img src={filler} id ='mouth' />
                <img src={filler} id='hair' />
                <img src={filler} id='eyes' />
                <img src={filler} id='shirt' />
                </div>
                {/*The Bio*/}
                <div className="bio">
                  <p style={{fontSize: 25, padding: 10}}>{currentUser.displayName}</p>
                  <p style={{fontSize: 20}}>Bio: I'm cool</p>
                </div>
                <div className="stats">
                  <p style={{fontSize: 20}}>Age: 23</p>
                  <p style={{fontSize: 20}}>Friends: 12</p>
                  <p style={{fontSize:25,padding:10}}>Gold: 100</p>
                  <p style={{fontSize:25}}>Level 2: 300/500 xp</p>
                </div>
            </div>
  )
}

export default Avatar