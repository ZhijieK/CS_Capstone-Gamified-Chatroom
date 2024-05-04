import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../firebase';
import {AuthContext} from '../../context/AuthContext.jsx';

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)
  
  const fetchRandomUser = async () => {
    const usersRef = collection(db, "users");
  
    try {
      // Get all user documents
      const querySnapshot = await getDocs(usersRef);
      const allUsers = querySnapshot.docs.map((doc) => doc.data());
  
      let randomIndex;
      let randomUser;
  
      // Keep generating a new random index until it's a different user
      do {
        randomIndex = Math.floor(Math.random() * allUsers.length);
        randomUser = allUsers[randomIndex];
      } while (randomUser.uid === currentUser.uid); // Check if it's the same user
  
      setUser(randomUser);
    } catch (err) {
      setErr(true);
    }
  };
  

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

  const handleSelect = async ()=>{
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()){
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages:[]});

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]: {
            uid:user.uid,
            displayName: user.displayName
          },
          [combinedId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid),{
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName: currentUser.displayName
          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  }

  const handleRandomUserClick = () => {
    try{
      fetchRandomUser(); // Call the function to fetch a random user
    } catch (err){
      console.error("Error occurred:", err);
    }
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a friend' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}/>
        <button className='random' onClick={handleRandomUserClick}>Random User</button>
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src="https://i.kym-cdn.com/photos/images/newsfeed/002/738/958/9e9" alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search