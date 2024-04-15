import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { getDownloadURL, ref} from 'firebase/storage';


const Chats = () => {
  const [chats, setChats] = useState([]);
  const [chatProfiles, setChatProfiles] = useState({});
  // console.log(chatProfiles["Ytraq2tkQ8PajFBj0s9cH7GPnQK2"].eyesLink)

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    const fetchChatProfiles = async () => {
      const profiles = {};

      // console.log(chats)
      for (const key of Object.keys(chats)) {
        const uid = chats[key].userInfo.uid;
        // console.log(uid);
        const userDataRef = doc(db, "users", uid);
        const userDataSnap = await getDoc(userDataRef);
        const userData = userDataSnap.data();
        // console.log(userData);
        const docRefs = Object.values(userData.profileIcon).map((itemId) =>
          doc(db, "shopItems", itemId)
        );

        const docSnapshots = await Promise.all(docRefs.map((docRef) => getDoc(docRef)));

        const shopItemsData = docSnapshots.map((docSnapshot) => docSnapshot.data());
        console.log(shopItemsData);
        let profileUpdates = {}
        for (const docSnap of docSnapshots) {
            const itemData = docSnap.data(); // Use docSnap.data() instead of docSnap.data
            const category = Object.keys(userData.profileIcon).find(
                (key) => userData.profileIcon[key] === itemData.itemName
            );
            if (category) {
                const url = await getDownloadURL(ref(storage, itemData.imageRef));
                profileUpdates[`${category}Link`] = url;
                profileUpdates[`${category}`] = itemData.itemName
            }
        }
        console.log(profileUpdates)
        profiles[uid] = profileUpdates; 
    };

      
      // console.log(profiles)
      setChatProfiles(profiles);
      console.log(chatProfiles)
    };

    if (Object.keys(chats).length > 0) {
      fetchChatProfiles();
    };
    console.log("chat profiles: ", chatProfiles[1], "hello")
  }, [chats]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([uid, chat]) => (
          <div className="userChat" key={uid} onClick={() => handleSelect(chat.userInfo)}>
            <div className="iconBackground">
              {["skin", "hair", "eyes", "mouth", "clothes"].map((category) => (
                  <img
                      key={category}
                      className="avatar-image"
                      data-category={category}
                      src={chatProfiles[uid]?.[`${category}Link`] || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                      alt={chatProfiles[category]}
                  />
              ))}
            </div>
            <div className="userChatInfo">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;

// const Chats = () => {

//   const [chats, setChats] = useState([])
//   const {currentUser} = useContext(AuthContext)
//   const {dispatch} = useContext(ChatContext)

//   useEffect(()=>{
//     const getChats = ()=>{
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });
  
//       return () => {
//         unsub();
//       };
//     };
//     currentUser.uid && getChats()
//   },[currentUser.uid]);

//   const handleSelect = (u)=>{
//     console.log(chats)
//     dispatch({type:"CHANGE_USER", payload: u})
//   }

//   return (
//     <div className='chats'>
//       {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//       <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
//         <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="" />
//         <div className="userChatInfo">
//           <span>{chat[1].userInfo.displayName}</span>
//           <p>{chat[1].lastMessage?.text}</p>
//         </div>
//       </div>
//       ))}
//     </div>
//   );
// };

// export default Chats