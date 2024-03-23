import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js'
import { AuthContext } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { reset } from '../../redux/features/userInfoSlice.js'



const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    const dispatch = useDispatch();

    dispatch(reset()); // Reset the Redux state

    signOut(auth) // Sign out the user with Firebase
        .then(() => {
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
  }

  return (
    <div className='navbar'>
      <span className="logo">Pixel Palz</span>
      <div className="user">
        <img src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' alt='profile picture' onClick={() => navigate('profile')}/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar