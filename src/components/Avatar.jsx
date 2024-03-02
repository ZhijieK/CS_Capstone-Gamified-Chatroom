import React from 'react';
import filler from './images/filler.png'; //Transparant img, placeholder for avatar before creation

const Avatar = () => {

  return (
            <div className="container"> {/*Grey box on left side*/}
                <h1>Profile</h1>
                {/*The Avatar*/}
                <div className="circle"> 
                <img src={filler} id ='skin' />
                <img src={filler} id ='mouth' />
                <img src={filler} id='hair' />
                <img src={filler} id='eyes' />
                <img src={filler} id='shirt' />
                </div>
                {/*The Bio*/}
                <p style={{fontSize: 25, padding: 10}}>Placeholder Name</p>
                <p style={{fontSize: 20}}>Age: 23</p>
                <p style={{fontSize: 20}}>Friends: 12</p>
                <p style={{fontSize: 20}}>Bio: I'm Cool</p>
                <h1 style={{fontSize:25,padding:10,margin:0}}>Gold: 100</h1>
                <h1 style={{fontSize:25,margin:0}}>Level 2: 300/500 xp</h1>
            </div>
  )
}

export default Avatar