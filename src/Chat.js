import React , { useState, useEffect } from 'react'; 
import 'react-chatbox-component/dist/style.css';
import { ChatBox } from 'react-chatbox-component';
import styled from 'styled-components';
import firebase from 'firebase'


const Container = styled.div`
  padding-right:0px;
  max-width: 100%;
  height: 100%;
  flex: 1;
  border-top-right-radius: 20px;
  border-bottom-right-radius:20px;
`

let db;

const Chat = ({user, chatee}) => {
  // console.log(user);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    db = firebase.firestore();
    db.collection("chats").get().then((querySnapshot) => {
      let chatId;
      querySnapshot.forEach((doc) => {
          // const { participants } = doc
          // if((participants[0] === user && participants[1] === chatee)
          //   || (participants[1] === user && participants[0] === chatee)
          //   ){
          //   chatId = doc.id;
          // } 
      });
      try {
        db.collection('chats').doc(chatId)
            .onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
            });
      } catch (error) {
        console.log(error)
      }
    });
  }, [])


  const onSubmit = async (message) => {
    db.collection("chats").doc("LA").set({
      participants: ['M5gZqQqCeKMapheKywsnYGkUxIR2', '']
    }).then(() => {
        console.log("Document successfully written!");
    });

    // setMessages([...messages, {
    //   "text": message,
    //   "id": messages.length + 1,
    //   "sender": {
    //     "name": "Ironman",
    //     "uid": '1234',
    //     "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png",
    //   }          
    // }])
  }

  return (
    <Container>
      <ChatBox 
        messages={messages} 
        onSubmit={onSubmit}
        user={'1234'}
      />
    </Container>
  )
}

export default Chat;