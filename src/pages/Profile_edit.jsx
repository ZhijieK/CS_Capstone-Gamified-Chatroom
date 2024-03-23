import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext.jsx';
import Avatar from '../components/profileComponents/Avatar.jsx';

const Profile_edit = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [err,setErr] = useState(false);

  //Used to store gender
  const[gender,setGender]=useState();
  const[female,setFemale]=useState();
  const[male,setMale]=useState();
  const[other,setOther]=useState();

  //Used to store user data
  const [info, setInfo] = useState([])

  //Handle updating user profile
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const name = e.target[0].value;
    const bio = e.target[1].value;
    const Gender = gender; //Gender is set by setGender

    try{
    //Update user data
    await updateDoc(doc(db, "users", currentUser.uid), {
      displayName: name,
      bio: bio,
      gender: Gender
    })

    navigate('../profile');
    
    } catch(err){
      setErr(true);
      console.log(err);
    }
    }

  //Get snapshot of user data
  useEffect(()=>{
    const getInfo = ()=>{
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setInfo(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInfo()
    });

    //Gets users gender to show during profile editing
    useEffect(()=>{
      const getGender = ()=>{
        if(info.gender == 'female'){
          setFemale(true);
          setGender('female');
        }
        else if(info.gender == 'male'){
          setMale(true);
          setGender('male');
        }
        else{
          setOther(true);
          setGender('other');
        }
      };
      getGender()
      });

    return (
        <div className="profile">
            <Avatar />
            <div className="container2">
                <p style={{fontSize: 35,padding:20}}>Edit your profile</p>
                <div className="edit_profile">
                <form onSubmit={handleSubmit}>
                  <label> Name </label>
                  <input type='text' defaultValue={info.displayName}></input>
                  <label> Bio </label>
                  <textarea placeholder='Tell us something about yourself' defaultValue={info.bio}></textarea>
                  
                  <fieldset>
                    <legend>Gender</legend>
                    <label> Female </label>
                    <input type='radio' value="female" defaultChecked={female} name ="gender" onChange={e=>setGender(e.target.value)} />
                    <label> Male </label>
                    <input type='radio' value="male" defaultChecked={male} name ="gender" onChange={e=>setGender(e.target.value)} />
                    <label> Other </label>
                    <input type='radio' value="other" defaultChecked={other} name ="gender" onChange={e=>setGender(e.target.value)} />
                  </fieldset>
                  {err && <span>Something went wrong</span>}
                  <button> Save </button>
              </form>
              <Link to="../profile" style={{color: 'black'}}> <button> Cancel </button> </Link>
            </div>
            </div>
        </div>
    )
  }
  
  export default Profile_edit