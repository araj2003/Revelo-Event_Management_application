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
import {
  getMessage,
  getSingleChannel,
  getSingleChat,
  sentMessage,
} from "@/api";
import "../../component/ChatInput/ChatInput.css";
import SendIcon from "@mui/icons-material/Send";
import AllMessages from "./AllMessages";
import ScrollableFeed from "react-scrollable-feed";
import { useAppDispatch, useAppSelector } from "@/hooks";
import io from "socket.io-client";
import placeholder from "../../../assets/no-chat-placeholder.png";

const ENDPOINT = import.meta.env.VITE_API_BASE_URL;
var socket: any, selectedChatCompare;

const Chat = ({ isDm }: { isDm: boolean }) => {
  const { roomId } = useParams<{ roomId: string }>();
  // const [roomDetails, setRoomDetails] = useState(null);
  const [messages, setMessages] = useState<any>([]);
  const { userId } = useAppSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");

  const { selectChannel, channelId } = useContext(ChatContext);
  const [data, setData] = useState<any>([]); //channel data
  const [chatName, setChatName] = useState<any>("");
  const [chatId, setChatId] = useState<any>("");
  const [socketConnected, setSocketConnected] = useState<Boolean>(false);
  // const [channelMessages,setChannelMessages] = useState<any>([])
  useEffect(() => {
    if (!isDm) {
      const getChannel = async () => {
        const response: any = await getSingleChannel(channelId);
        console.log(response);
        setMessages(response?.messages);
        setData(response?.channel);
        // console.log(data?.chat?._id)
        setChatId(response.channel?.chatId);
        socket.emit("join-chat", response.channel?.chatId);
      };
      if (selectChannel && channelId) {
        getChannel();
      }
    }
  }, [selectChannel, channelId]);

  useEffect(() => {
    if (isDm) {
      const getChannel = async () => {
        const response: any = await getSingleChat(roomId);
        console.log(response);
        setMessages(response?.messages);
        // console.log(data?.chat?._id)
        setChatId(response?.chat?._id);
        setChatName(response?.chat?.chatName);
        socket.emit("join-chat", response?.chat?._id);
      };
      if (roomId) {
        getChannel();
      }
    }
  }, [roomId]);

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

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (newMessage) {
      try {
        const response2 = await sentMessage(newMessage, chatId);
        console.log(response2);
        setNewMessage("");
        socket.emit("new-message", response2, chatId);
        setMessages([...messages, response2]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!socketConnected) {
      socket = io(ENDPOINT);
      socket.emit("setup", userId);

      socket.on("connected", () => setSocketConnected(true));
      // socket.on("typing", () => setIsTyping(true));
      // socket.on("stop typing", () => setIsTyping(false));
      // socket.on("message recieved", (newMessageRecieved:any) => {
      // eslint-disable-next-line
      socket.on("message-received", (newMessageRecieved: any) => {
        console.log(newMessageRecieved);
        console.log(messages);
        setMessages((prev: any) => {
          console.log(prev);
          return [...prev, newMessageRecieved];
        });
      });
    }
  }, []);

  // useEffect(() => {});

  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);
  };

  if ((!isDm && !channelId) || !chatId)
    return (
      <div className="h-full w-full flex flex-col items-center justify-center chat">
        <img src={placeholder} className="h-2/3 object-scale-down" />
        <p className="text-2xl font-bold">Select a {isDm?'chat':'channel'}</p>
      </div>
    );
  return (
    <>
      <div className="chat flex h-full">
        <div className="chat__header">
          <div className="chat__headerLeft">
            <h4 className="chat_channelName">
              <strong>{data?.channelName}</strong>
              <strong>{chatName}</strong>
            </h4>
          </div>
          {/* <div className="chat__headerRight">
            <p>
              <InfoIcon /> Details
            </p>
          </div> */}
        </div>
        <div className="sidebar__icon overflow-y-scroll flex flex-col gap-10 p-10">
          
            {messages?.map((message: any, index: number) => (
              <Message
                key={index}
                message={message?.content}
                sender={message?.sender}
                time={message?.updatedAt}
                userImage={message?.sender?.profilePicture}
                userId={userId}
              />
            ))}
          
        </div>
        <div className="chatInput mt-auto">
          <form onSubmit={sendMessage} className="flex">
            <input
              type="text"
              placeholder="Enter a message"
              onChange={(e) => typingHandler(e)}
              value={newMessage}
            />
            <button type="submit">
              <SendIcon className="text-black"/>
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
