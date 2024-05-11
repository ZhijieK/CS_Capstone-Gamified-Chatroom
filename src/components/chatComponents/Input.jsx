import React, { useContext, useState } from 'react'
import File from '../images/generalIcons/File.png'
import Quiz from '../images/generalIcons/quiz.png'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { v4 as uuid } from 'uuid'

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [quizClicked, setQuizClicked] = useState(false); // Add this line
  const [correctAnswer, setCorrectAnswer] = useState(""); // Add this line

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

//Handles sending the message
const handleSend = async ()=>{
  if (text !== "") {
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date:Timestamp.now(),
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

    if(quizClicked) {
      // Do something with the message here
      console.log("Quiz was clicked, message is: ", text);
      setQuizClicked(false); // Reset the quizClicked state
    }

    setText("")
    setImg(null)
  }
};

  //Handles fetching the question and sending it as a message
  const handleQuiz = async () => {
    const response = await fetch('https://the-trivia-api.com/v2/questions');
    const data = await response.json();
    const question = data[0].question.text;
    const answer = data[0].question.answer; // Adjust this line based on the actual structure of your data

    setText(question);
    setCorrectAnswer(answer); // Store the correct answer
    setQuizClicked(true); // Set the quizClicked state to true
    handleSend();
  };

return (
  <div className='input'>
    <input type="text" placeholder='Type your message...' onChange={e=>setText(e.target.value)} value={text}/>
    <div className="send">
      <button className='quizButton' onClick={handleQuiz}>
        <img src={Quiz} alt="Quiz" />
      </button>
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}/>
      <label htmlFor="file">
        <img className='addFile' src={File} alt=''/>
      </label>
      <button className='sendButton' onClick={handleSend}>Send</button>
    </div>
  </div>
)
}

export default Input