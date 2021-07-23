import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Message = ({ user, message }) => {
    const [userLogin] = useAuthState(auth)

    const TypeOfMessage = user === userLogin.email ? Sender : Reciever;
    return (<Container>
        <TypeOfMessage>
            {message?.message}
            <TimeStamp>
                {message?.timestamp ? moment(message?.timestamp).format('LT') : '...'}
            </TimeStamp>
        </TypeOfMessage>
        {/* <p>Message</p> */}
    </Container>);
}

export default Message;

const Container = styled.div``;


const MessageElement = styled.p`
 width: fit-content;
 padding: 15px;
 border-radius: 8px;
 margin: 10px;
 min-width: 60px;
 padding-bottom: 16px;
 position: relative;
 text-align: right;
`;

const Sender = styled(MessageElement)`
 margin-left: auto;
 background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
   background-color: whitesmoke;
  text-align: left;
`;

const TimeStamp = styled.span`
   color: gray;
   padding: 4px;
   font-size: 9px;
   position: absolute;
   bottom: 0;
   text-align: right;
   right: 0
`;