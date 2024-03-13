import React from 'react';
import Logo from '../images/generalIcons/Logo.png';
import { Link } from 'react-router-dom';

const Homebar = () => {
    return (
        <div className="homebar">
            <div className="left">
                <Link to="/home_page"> <img src={Logo} /> </Link>
                <h1>Pixel Palz</h1>
            </div>
            <div className="right">
                <Link to="/login" style={{color: 'black'}}> <div className="loginbuttons"> <p> Login </p> </div> </Link>
                <Link to="/register" style={{color: 'black'}}> <div className="loginbuttons"> <p> Sign Up </p> </div> </Link>
            </div>
        </div>
    )
  }
  
  export default Homebar