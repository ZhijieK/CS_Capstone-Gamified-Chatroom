import React, { useState } from 'react'
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch(err) {
      setErr(true);
    }
    
  };

  const handleKey = e=>{
    e.code == "Enter" && handleSearch();
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a friend' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChat">
        <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/738/958/9e9" alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search