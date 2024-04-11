import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

const FriendsList = () => {
    const [info, setInfo] = useState([])
    const { currentUser } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);

    //Get snapshot of user data
    useEffect(()=>{
        const getInfo = ()=>{
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setInfo(doc.data());
            const fireArray = info.friends || [];
            setFriends([...fireArray]);
            
        });
    
        return () => {
            unsub();
        };
        };
        currentUser.uid && getInfo()
    }, [friends]);

    return (
        <div className="drag">
                <div className="friendslist">
                    <Link to="../" style={{ color: "black" }}>
                    <div className="button"> Close </div>
                    </Link>
                    <p style={{ fontSize: 20, padding:8}}>Friends</p>

                    {friends.map((friend, index) => {
                        return (
                            <>
                                <div key={index} className="friend">
                                <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="" />
                                    <p>{friend}</p>
                                </div>
                            </>
                        )
                    })}
            </div>
        </div>
    )
}

export default FriendsList;