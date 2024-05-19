import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref } from 'firebase/storage'

const Icon = ({uid}) =>{
    const [chatProfiles, setChatProfiles] = useState([]);

    useEffect(() => {
        const fetchChatProfiles = async () => {
          const profiles = {};
          console.log(uid)
          const userDataRef = await getDoc(doc(db, "users", uid)); 
          const userData = userDataRef.data();
          console.log(userData); 
  
          const docRefs = Object.values(userData.profileIcon).map((itemId) =>
            doc(db, "shopItems", itemId)
          );
  
          const docSnapshots = await Promise.all(
            docRefs.map((docRef) => getDoc(docRef))
          );
  
          const shopItemsData = docSnapshots.map((docSnapshot) =>
            docSnapshot.data()
          );
          console.log(shopItemsData);
          let profileUpdates = {};
          for (const docSnap of docSnapshots) {
            const itemData = docSnap.data(); 
            console.log(itemData)
            const category = itemData.itemCategory;
            if (category) {
              const url = await getDownloadURL(ref(storage, itemData.imageRef));
              console.log(url)
              profileUpdates[`${category}Link`] = url;
              profileUpdates[`${category}`] = itemData.itemName;
            }
          }
          // console.log(profileUpdates)
          setChatProfiles(profileUpdates);
          // console.log(chatProfiles);
        };
        fetchChatProfiles();
    }, [uid]);

    return(
        <div className={"chatProfileIcon"}>
            {["skin", "hair", "eyes", "mouth", "clothes"].map((category) => (
                <img
                    key={category}
                    className="avatar-image"
                    data-category={category}
                    src={chatProfiles[`${category}Link`] || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'}
                    alt={chatProfiles[category]}
                />
            ))}
        </div>
    )

}

export default Icon;