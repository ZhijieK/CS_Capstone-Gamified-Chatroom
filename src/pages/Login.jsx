import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Homebar from '../components/profileComponents/Homebar';
import Logo from '../components/images/generalIcons/Logo.png';
import pic from '../components/images/generalIcons/User.png';

const Login = () => {

  const navigate = useNavigate();

  const [err,setErr] = useState(false);
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch(err){
      const errorMessage = err.message.split('/')[1].slice(0, -2).replace(/-/g, ' ').replace(/^(.)/, match => match.toUpperCase()) + ". Please try again.";
      setErr(errorMessage);
      console.log(err);
    }
  }

  return (
    <div className="homepage">
        <Homebar/>
        <div className="homecontent">
          <div className="home_img">
            <img src={Logo} />
          </div>
          <div className='login_box'>
              <span className="title">Pixel Palz</span>
              <img className='login_pic' src={pic}/>
              <form onSubmit={handleSubmit}>
                  <input type='text' placeholder='Email'></input>
                  <input type='password' placeholder='Password'></input>
                  <button>Log in</button>
                  {err && <span className='error_message'>{err}</span>}
              </form>
              <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </div>
    </div>    
  )
}

export default Login