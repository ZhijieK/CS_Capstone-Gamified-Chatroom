import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Homebar from "../components/profileComponents/Homebar";
import Logo from "../components/images/generalIcons/Logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
      navigate('/login'); // or wherever you want to redirect the user to
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="homepage">
        <Homebar/>
        <div className="homecontent">
          <div className="home_img">
            <img src={Logo} />
          </div>
          <div className='login_box'>
              <span className="title">Pixel Palz</span>
              <span className="title2">Enter your email</span>
              <form onSubmit={handleResetPassword}>
                  <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                  <button style={{width: "150px"}} type="submit">Reset Password</button>
                  {err && <span className='error_message'>{err}</span>}
              </form>
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
