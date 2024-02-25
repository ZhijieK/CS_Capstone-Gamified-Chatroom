import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from '../firebase'; 
import { doc, setDoc } from "firebase/firestore";
import { useRoutes, Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    //users database
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email
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
    <div className="form_container">
        <div className='form_wrapper'>
            <span className="logo">Pixel Palz</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username'></input>
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
        
  )
}

export default Register