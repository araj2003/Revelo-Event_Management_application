import { useParams } from "react-router-dom";
import "./Chat.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import Message from "../../component/Message/Message";
import ChatInput from "../../component/ChatInput/ChatInput";
import Editor from "../../component/Editor/Editor";
import UserList from "@/component/UserList";
import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";
import { getMessage, getSingleChannel, sentMessage } from "@/api";
import "../../component/ChatInput/ChatInput.css";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState<any>([]);

  const [newMessage,setNewMessage] = useState("")

  const { selectChannel, channelId } = useContext(ChatContext);
  const [data, setData] = useState<any>([]);//channel data
  const [chatId,setChatId] = useState<any>("")
  // const [channelMessages,setChannelMessages] = useState<any>([])
  useEffect(() => {
    const getChannel = async () => {
      const response: any = await getSingleChannel(channelId);
      console.log(response);
      setMessages(response?.messages)
      setData(response?.channel);
      // console.log(data?.chat?._id)
      setChatId(response.channel?.chatId)
    };
    if (selectChannel&&channelId) {
      getChannel();
    }
  }, [selectChannel, channelId]);

  // const fetchMessages = async() => {
  //   if(selectChannel){
  //     const response:any = await getMessage(data?.chat?._id)
  //     console.log(response)
  //     setMessages(response);
  //   }
  // }

  // useEffect(() => {
  //   fetchMessages()
  // },[selectChannel])

  const sendMessage = async(e:any) => {
    e.preventDefault()
    if(newMessage){
      try {
        const response2 = await sentMessage(newMessage,chatId)
        console.log(response2)
        setNewMessage("")
        setMessages([...messages,data])
      } catch (error) {
          console.log(error)
      }
    }
  }

  const typingHandler = (e:any) => {
    setNewMessage(e.target.value)
  }
  // console.log(newMessage)
  console.log(messages)
  if(!channelId||!chatId) return <div>Click a channel to show its chats</div>
  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <h4 className="chat_channelName">
              <strong>{data?.channelName}</strong>
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
          //all messages
        </div>
        <div className="chatInput">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Enter a message"
              onChange={(e) => typingHandler(e)}
              value={newMessage}
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
        {/* <Editor /> */}
      </div>
      {/* <UserList /> */}
    </>
  );
};

export default Chat;
