import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">Pixel Palz</span>
      <div className="user">
        <img src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' alt='profile picture' />
        <span>ZG</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar