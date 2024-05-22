import React, { useContext, useState, useEffect } from 'react'
import File from '../images/generalIcons/File.png'
import Quiz from '../images/generalIcons/quiz.png'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc, onSnapshot, arrayRemove, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { v4 as uuid } from 'uuid'
import trivia from '../images/generalIcons/trivia.png'
import Name from './Name.jsx'
import { current } from '@reduxjs/toolkit'

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [game, setGame] = useState(false);
  const [game2, setGame2] = useState(false);
  const [info, setInfo] = useState([]);
  const [info2, setInfo2] = useState([]);
  const [err, setErr] = useState(false);
  const [quizClicked, setQuizClicked] = useState(false); // Add this line
  const [correctAnswer, setCorrectAnswer] = useState(""); // Add this line

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const getInfo = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setInfo(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getInfo();
  }, [currentUser.uid]);

  //Get snapshot of other user data
  useEffect(()=>{
    const getInfo2 = ()=>{
      const unsub = onSnapshot(doc(db, "users", data.user?.uid), (doc) => {
        setInfo2(doc.data());
      });
  
      return () => {
        unsub();
      };
    };
    data.user?.uid && getInfo2()
  }, []);

//Handles sending the message
const handleSend = async ()=>{
  if (text !== "") {
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
    } else {
      // Retrieve the current messages from the Firestore document
      console.log("istext")
      const chatDoc = await getDoc(doc(db, "chats", data.chatId));
      let answeredCorrectly = false;
      let isAnswer = false;
      let expectedAnswer = ""

      if (chatDoc.exists()) {
        const messages = chatDoc.data().messages;

        if (messages.length > 0 && messages[messages.length - 1].isQuiz) {
          isAnswer = true;
          expectedAnswer = messages[messages.length - 1].expectedAnswer
          console.log(expectedAnswer)
          if (text.toLowerCase().trim() != "" &&  text.toLowerCase().trim() == expectedAnswer.toLowerCase().trim()){
            answeredCorrectly = true;
          }
        }
      }

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
          isQuiz: quizClicked ? true : false,
          expectedAnswer: quizClicked ? correctAnswer : "",
          answeredCorrectly: answeredCorrectly,
          isAnswer: isAnswer
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    })

    await updateDoc(doc(db, "users", currentUser.uid), {
      messages_sent: (info.messages_sent + 1),
    });

    if(quizClicked) {
      // Do something with the message here
      console.log("Quiz was clicked, message is: ", text);
      setQuizClicked(false); // Reset the quizClicked state
    }

    setText("")
    setImg(null)
  }
};

  /* Handles game invite popup */
  const toggleGame = () => {
    setGame2(!game2)
  }

  //Handles fetching the question and sending it as a message
  const handleQuiz = async (e) => {
    try{
      /* Remove the persons uid from your game_request list */
      await updateDoc(doc(db, "users", currentUser.uid), {
          game_request: arrayRemove(e),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
    }

    setGame2(!game2)
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    console.log(data)
    const question = data[0].question.text;
    const answer = data[0].correctAnswer.toLowerCase().trim(); // Adjust this line based on the actual structure of your data
    console.log(answer)

    setText(question);
    setCorrectAnswer(answer); // Store the correct answer
    setQuizClicked(true); // Set the quizClicked state to true
    handleSend();
  };

  /* Handles trivia invite confirmation popup */
  const toggleTrivia = () => {
    setGame(!game)
  }

  /* handles sending trivia invite */
  const handleInvite = async () => {

    setGame(!game)
    try{
      //Update user data
      await updateDoc(doc(db, "users", data.user?.uid), {  
        game_request: arrayUnion(currentUser.uid),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
      } 
  }

  /* Check if the person you're chatting with has invited you to a game */
  useEffect(()=>{
    const array = info.game_request || [];

    if(array[0] == data.user?.uid && !game && array[0] != null){
      setGame2(true)
    }
  }, [data.user]);

  /* Handle declining game invite */
  const handleDecline = async (e) => {

    setGame2(!game2);
    try{
      /* Remove the persons uid from your game_request list */
      await updateDoc(doc(db, "users", currentUser.uid), {
          game_request: arrayRemove(e),
      })
      
      } catch(err){
          setErr(true);
          console.log(err);
      } 
  }

return (
  <div className='input'>
    <input type="text" placeholder='Type your message...' onChange={e=>setText(e.target.value)} value={text}/>
    <div className="send">
        <img src={trivia} onClick={toggleTrivia}/>
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
      <label htmlFor="file">
        <img className='addFile' src={File} alt=''/>
      </label>
      <button className='sendButton' onClick={handleSend}>Send</button>
    </div>

      {/* Invite friend popup */}
      {
        game && 
        <div className="popup">
          <div className="overlay2">
            <div className="request">
              <p>Would you like to invite {<Name id={data.user?.uid} />} to a game of trivia?</p>
              <div className="buttons">
                <div className="button" onClick={handleInvite} > Yes </div>
                <div className="button2" onClick={toggleTrivia} > No </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Invitation popup */}
      {
        game2 && 
        <div className="popup">
          <div className="overlay2" onClick={toggleGame}>
            <div className="request">
              <p> {<Name id={data.user?.uid} />} has invited you to a game of trivia, would you like to accept?</p>
              <div className="buttons">
                <div className="button" onClick={() => handleQuiz(info2.uid)} > Yes </div>
                <div className="button2" onClick={() => handleDecline(info2.uid)} > No </div>
              </div>
            </div>
          </div>
        </div>
      }
  </div>
)
}

export default Input