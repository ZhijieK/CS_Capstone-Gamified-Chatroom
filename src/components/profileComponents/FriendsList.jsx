import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase.js";
import { ChatContext } from '../../context/ChatContext';
import Name from "../chatComponents/Name.jsx";
import accept from "../images/generalIcons/checkmark.png";
import decline from "../images/generalIcons/x.png";
import msg from "../images/generalIcons/msg.png";

const FriendsList = () => {
    const [info, setInfo] = useState([])
    const { currentUser } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [popup, setPopup] = useState(true);
    const [popup2, setPopup2] = useState(false);
    const [err,setErr] = useState(false);
    const {dispatch} = useContext(ChatContext)
    const navigate = useNavigate();
    const [test, setTest] = useState(false);

    const [chat, setChat] = useState([
        {
            displayName: '',
            uid: '',
        }
    ]);

    /* Handles switching between friends list and friend requests */
    const togglePopup = () => {
        setPopup(!popup)
        setPopup2(!popup2)
    }

    //Get snapshot of user data
    useEffect(()=>{
        const getInfo = ()=>{
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setInfo(doc.data());
            //Store friends and requests lists
            const fireArray = info.friends || [];
            setFriends([...fireArray]);
            const requestArray = info.requests || [];
            setRequests([...requestArray]);
        
            //Handles opening a chat with a friend
            dispatch({type:"CHANGE_USER", payload: chat})
        });
    
        return () => {
            unsub();
        };
        };
        currentUser.uid && getInfo()
    }, [friends]);

    /* Accept a friend request */
    const handleAccept = async (e) =>{
        
        try{
        //Update both users friends list
        await updateDoc(doc(db, "users", currentUser.uid), {
            friends: arrayUnion(e),
            requests: arrayRemove(e),
        })

        await updateDoc(doc(db, "users", e), {
            friends: arrayUnion(currentUser.uid),
        })
        
        } catch(err){
            setErr(true);
            console.log(err);
        } 
    }

    /* Decline a friend request */
    const handleDecline = async (e) =>{

        try{
        //Remove friend request
        await updateDoc(doc(db, "users", currentUser.uid), {
            requests: arrayRemove(e),
        })
        
        } catch(err){
            setErr(true);
            console.log(err);
        } 
    }

    /* Remove a friend */
    const handleRemove = async (e) =>{

        try{
        //Remove friend
        await updateDoc(doc(db, "users", currentUser.uid), {
            friends: arrayRemove(e),
        })

        await updateDoc(doc(db, "users", e), {
            friends: arrayRemove(currentUser.uid),
        })
        
        } catch(err){
            setErr(true);
            console.log(err);
        } 
    }
    
    const handleSelect = (u)=>{
        setChat({uid: u});
    }

    return (
        <div className="drag">
                <div className="friendslist">
                    {/* Close button */}
                    <div className="button" style={{ color: "black" }} onClick={() => navigate('../')}> Close </div>
                    {popup && <p style={{ fontSize: 20, padding:8}}> Friends </p>}
                    {popup2 && <p style={{ fontSize: 20, padding:8}}> Requests </p>}
                    {/* Friend requests button */}
                    {popup && <div className="button2" style={{color: "black"}} onClick={togglePopup}> Requests </div>}
                    {popup2 && <div className="button2" style={{color: "black"}} onClick={togglePopup}> Friends </div>}

                    {/* List of friends */}
                    {popup && friends.map((friend, index) => (
                            <>
                                <div key={index} className="friend">
                                    <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="" />
                                    <Name id={friend}/>
                                    <img className="accept" src={msg} onClick={() =>handleSelect(friend)} />
                                    <img className="decline" src={decline} onClick={() =>handleRemove(friend)}/>
                                </div>
                            </>
                    ))}

                    {/* List of friend requests */}
                    {popup2 && requests.map((request, index) => {
                        return (
                            <>
                                <div key={index} className="friend">
                                    <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="" />
                                    <Name id={request}/>
                                    <img className="accept" src={accept} onClick={() =>handleAccept(request)} />
                                    <img className="decline" src={decline} onClick={() =>handleDecline(request)}/>
                                </div>
                            </>
                        )
                    })}
            </div>
        </div>
    )
}

export default FriendsList;