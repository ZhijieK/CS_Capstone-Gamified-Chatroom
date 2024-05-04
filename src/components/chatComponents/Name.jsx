import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

/* Returns current displayname for given uid */
const Name = (props) => {
    const id = props.id;
    const [info, setInfo] = useState([])

    //Get snapshot of user data
    useEffect(()=>{
        const getInfo = ()=>{
        const unsub = onSnapshot(doc(db, "users", id), (doc) => {
            setInfo(doc.data());
        });
    
        return () => {
            unsub();
        };
        };
        id && getInfo()
    });

    return (
        <div className="userChatInfo">
            <span>{info.displayName}</span>
        </div>
    )
}

export default Name;