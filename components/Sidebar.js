import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const chatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(chatRef);

  //
  const createChat = () => {
    const input = prompt("plase enter an email address to chat !");

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      db.collection("chats").add({
        users: [input,user.email],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    return !!chatSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => user === recipientEmail?.lenght > 0)
    );
  };

  //
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <StyleInput placeholder="Search in chat.." />
      </Search>

      <SidebarButton onClick={createChat}>Start A new Chat</SidebarButton>

      {chatSnapshot?.docs.map(chat => (
        <Chat key={chat.id} id={chat.id} users={ chat.data().users}/>
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`

  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
   ::-webkit-scrollbar{
     display: none;
   }

   -ms-overflow-style: none;
   scrollbar-width: none;

`;

const SidebarButton = styled.button`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid whitesmoke;
  height: 80px;
`;

const StyleInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const IconsContainer = styled.div``;
