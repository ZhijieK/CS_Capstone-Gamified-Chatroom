import React from 'react';
import Homebar from '../components/profileComponents/Homebar';
import Logo from '../components/images/generalIcons/Logo.png';

const HomePage = () => {
    return (
      <div className="homepage">
        <Homebar/>
        <div className="homecontent">
            <img src={Logo} />
            <div className="home_msg">
                <h1 style={{fontSize: 40}}>Welcome to Pixel Palz</h1>
                <p style={{fontSize: 30}}>We provide a wonderful chatting service <br/> with a customizable avatar!</p>
            </div>
        </div>
      </div>
    )
  }
  
  export default HomePage