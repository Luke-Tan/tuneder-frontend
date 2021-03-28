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
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    db = firebase.firestore();
    db.collection("chats").get().then((querySnapshot) => {
      let localId;
      querySnapshot.forEach((doc) => {
          console.log(chatee)
          const { participants } = doc.data()
          console.log(participants)
          console.log(chatee.id)
          console.log(user)
          if((participants[0] === user && participants[1] === chatee.id)
            || (participants[1] === user && participants[0] === chatee.id)
            ){
            setChatId(doc.id)
            localId = doc.id
          } 
      });

      if(localId){
        try {
          db.collection('chats').doc(localId)
              .onSnapshot((doc) => {
                  const { messages } = doc.data();
                  console.log('snapshotted')
                  console.log(localId)
                  console.log(messages)
                  setMessages(messages.map((msg, index) => {
                    return {
                      "text": msg.message,
                      "id": index,
                      "sender": {
                        "name": msg.sender === user ? 'Luke' : chatee.name,
                        "uid": msg.sender,
                        "avatar": "https://data.cometchat.com/assets/images/avatars/ironman.png"
                      }
                    }
                  }))
              });
        } catch (error) {
          console.log(error)
        }        
      }

    });
  }, [chatee])


  const onSubmit = async (message) => {
    let messages2 = [...messages.map(msg => ({message: msg.text, sender: msg.sender.uid})), {sender:user,message}]
    console.log(messages2)
    db.collection("chats").doc(chatId).set({
      participants: [user, chatee.id],
      messages:messages2
    }).then(() => {
        console.log("Document successfully written!");
    });
  }

  return (
    <Container>
      <ChatBox 
        messages={messages} 
        onSubmit={onSubmit}
        user={{uid: user}}
      />
    </Container>
  )
}

export default Chat;