import { useParams } from "react-router-dom";
import "./Chat.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import Message from "../../component/Message/Message";
import ChatInput from "../../component/ChatInput/ChatInput";
import Editor from "../../component/Editor/Editor";
import UserList from "@/component/UserList";

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetails, setRoomDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([
    {
      message: "Hi",
      time: ": Thursday, 16th May 2024 11:00:00",
      user: "Sahil",
      userImage: "userImage",
    },
    {
      message: "Kitna kaam hua",
      time: ": Thursday, 16th May 2024 11:10:00",
      user: "Lakshya",
      userImage: "userImage",
    },
    {
      message: "almost done",
      time: ": Thursday, 16th May 2024 11:12:00",
      user: "Araj",
      userImage: "userImage",
    },
  ]);
  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <h4 className="chat_channelName">
              <strong>#General</strong>
              <StarBorderIcon />
            </h4>
          </div>
          {/* <div className="chat__headerRight">
            <p>
              <InfoIcon /> Details
            </p>
          </div> */}
        </div>
        <div className="chat__messages">
          {channelMessages.map(({ message, time, user, userImage }) => (
            <Message
              message={message}
              time={time}
              user={user}
              userImage={userImage}
            />
          ))}
        </div>
        <ChatInput />
        {/* <Editor /> */}
      </div>
      <UserList />
    </>
  );
};

export default Chat;
