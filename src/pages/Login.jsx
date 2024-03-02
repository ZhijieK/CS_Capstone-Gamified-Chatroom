import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

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
      setErr(true);
      console.log(err);
    }
  }

  return (
    <div className="form_container">
        <div className='form_wrapper'>
            <span className="logo">Pixel Palz</span>
            <img className='login_avatar' src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'/>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                <button>Log in</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
    </div>
        
  )
}

export default Login