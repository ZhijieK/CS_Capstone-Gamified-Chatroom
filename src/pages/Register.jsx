import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from '../firebase'; 
import { doc, setDoc } from "firebase/firestore";
import { useRoutes, Link, useNavigate } from "react-router-dom";
import Homebar from '../components/profileComponents/Homebar';
import Logo from '../components/images/generalIcons/Logo.png';

const Register = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const bio = '';
    const gender = '';

    try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    //users database
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      bio,
      gender,
    })
    await updateProfile(res.user, {
      displayName
    })
    navigate('/');
    //userChats database
    await setDoc(doc(db, "userChats", res.user.uid), {});

    
    } catch(err){
      setErr(true);
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
              <span className="title2">Create Your Account</span>
              <form onSubmit={handleSubmit}>
                  <input type='text' placeholder='Username' ></input>
                  <input type='email' placeholder='Email'></input>
                  <input type='password' placeholder='Password'></input>
                  <button>Sign up</button>
                  {err && <span>Something went wrong</span>}
              </form>
              <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
    </div>
        
  )
}

export default Register