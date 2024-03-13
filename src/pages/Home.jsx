import React from 'react'
import Sidebar from "../components/chatComponents/Sidebar"
import Chat from '../components/chatComponents/Chat'

const Home = () => {
  return (
    <div className='chatroom'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home