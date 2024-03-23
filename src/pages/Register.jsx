import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRoutes, Link, useNavigate } from "react-router-dom";
import Homebar from "../components/profileComponents/Homebar";
import Logo from "../components/images/generalIcons/Logo.png";

const Register = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //users database
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        profileIcon: {
          skin: "skin3",
          hair: "black_short_hair",
          eyes: "brown_eyes",
          mouth: "smile",
          clothes: "red_shirt",
        },
        inventory: ["skin3", "black_short_hair", "brown_eyes", "smile", "red_shirt"],
        wallet: 100,
      });
      await updateProfile(res.user, {
        displayName,
      });
      navigate("/");
      //userChats database
      await setDoc(doc(db, "userChats", res.user.uid), {});
    } catch (err) {
      const errorMessage =
        err.message
          .split("/")[1]
          .slice(0, -2)
          .replace(/-/g, " ")
          .replace(/^(.)/, (match) => match.toUpperCase()) +
        ". Please try again.";
      setErr(errorMessage);
      console.log(err);
    }
  };

  return (
    <div className="homepage">
      <Homebar />
      <div className="homecontent">
        <div className="home_img">
          <img src={Logo} />
        </div>
        <div className="login_box">
          <span className="title">Pixel Palz</span>
          <span className="title2">Create Your Account</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <button>Sign up</button>
            {err && <span className="error_message">{err}</span>}
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
