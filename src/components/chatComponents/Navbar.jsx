import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js'
import { AuthContext } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();

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