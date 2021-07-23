import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useRef, useState } from "react";
import firebase from "firebase";
import Message from "./Message";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react';

const ChatScreen = ({ chat, messages }) => {
  console.log("chat,messages: "+ chat,messages)
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null)
  const router = useRouter();

  const [recipientSnapshot] = useCollection(
    db.collection("users").where('email' ,'==', getRecipientEmail(chat.users,user))
  )
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      // .get()
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  //
  const showMessages = () => {
    if (messagesSnapshot) {
      return  messagesSnapshot.docs.map((message) => (
        <Message
          id={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      JSON.parse(messages).map((message) => (
        <Message id={message.id} user={message.user} message={message} />
      ));
    }

    return <Message/>
  };

  const scrollToBotttom = ()=>{
    console.log("scrollToBotttom",endOfMessageRef)
    endOfMessageRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }

  const sendMessage = (e) => {
    e.preventDefault();
            
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBotttom()
    // console.log(JSON.stringify(messagesSnapshot.docs.map(message=>{
    //   return message;
    // })));
  };

 
 
  const recipientEmail = getRecipientEmail(chat.users, user)

  //
  return (
    <Container>
      <Header>
        {recipient? <Avatar src={recipient?.photoURL}/>: <Avatar>{recipientEmail[0]}</Avatar>}
        
        <Headerinformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot? (<p>Last Active: {' '} {recipient?.lastSeen?.toDate() ?(
            <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
          ):("Un Available")}</p>):(<p>Loading Active...</p>)}
        
        </Headerinformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndofMessage ref={endOfMessageRef}/>
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />

        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" hidden disabled={!input} onClick={sendMessage}>
          Send Message
        </button>

        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const Headerinformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  height: 90vh;
  overflow-y: scroll;
  ::-webkit-scrollbar{
    display: none
  } 
`;
const EndofMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: white;
  margin: 0px 15px;
  padding: 15px 5px;
  border-radius: 20px;
  outline: none;
  border: none;
  background-color: #e5ded8;
`;
